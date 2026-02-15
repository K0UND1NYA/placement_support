import express from 'express';
import { query } from '../db';
import { authenticateJWT, AuthRequest, authorizeRoles } from '../middleware/auth';
import { InferenceClient } from '@huggingface/inference';

const router = express.Router();

// Initialize Hugging Face Client
let hf: InferenceClient | null = null;
const getHF = () => {
    if (!hf) {
        if (!process.env.HF_TOKEN) {
            console.warn('HF_TOKEN is missing. AI features will fail.');
        }
        hf = new InferenceClient(process.env.HF_TOKEN);
    }
    return hf;
};

// ==========================================
// TPO Endpoints
// ==========================================

// Create a Mock Interview Slot
router.post('/create', authenticateJWT, authorizeRoles('tpo'), async (req: AuthRequest, res: any) => {
    const { title, domain, topic, description, difficulty, start_time, end_time } = req.body;
    const userId = req.user?.id;

    try {
        // Get college_id
        const userResult = await query('SELECT college_id FROM users WHERE id = $1', [userId]);
        const collegeId = userResult.rows[0]?.college_id;

        if (!collegeId) return res.status(403).json({ error: 'User not associated with a college' });

        const result = await query(
            `INSERT INTO mock_interviews 
            (college_id, title, domain, topic, description, difficulty, start_time, end_time, created_by)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING *`,
            [collegeId, title, domain, topic, description || '', difficulty, start_time, end_time, userId]
        );

        res.status(201).json(result.rows[0]);
    } catch (err: any) {
        console.error('Error creating mock interview:', err);
        res.status(500).json({ error: 'Failed to create mock interview' });
    }
});

// List Mock Interviews (TPO View)
router.get('/tpo/list', authenticateJWT, authorizeRoles('tpo'), async (req: AuthRequest, res: any) => {
    const userId = req.user?.id;
    try {
        const userResult = await query('SELECT college_id FROM users WHERE id = $1', [userId]);
        const collegeId = userResult.rows[0]?.college_id;

        const result = await query(
            `SELECT * FROM mock_interviews WHERE college_id = $1 ORDER BY start_time DESC`,
            [collegeId]
        );
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch interviews' });
    }
});

// ==========================================
// Student Endpoints
// ==========================================

// List Mock Interviews (Student View)
router.get('/student/list', authenticateJWT, authorizeRoles('student'), async (req: AuthRequest, res: any) => {
    const userId = req.user?.id;
    try {
        const userResult = await query('SELECT college_id FROM users WHERE id = $1', [userId]);
        const collegeId = userResult.rows[0]?.college_id;

        // Fetch interviews + check if attempted
        const result = await query(
            `SELECT mi.*, 
            (SELECT COUNT(*) FROM mock_interview_attempts mia WHERE mia.mock_interview_id = mi.id AND mia.student_id = $2) as attempts_count,
            (SELECT status FROM mock_interview_attempts mia WHERE mia.mock_interview_id = mi.id AND mia.student_id = $2 LIMIT 1) as attempt_status
            FROM mock_interviews mi 
            WHERE mi.college_id = $1 
            ORDER BY mi.start_time ASC`,
            [collegeId, userId]
        );
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch interviews' });
    }
});

// Start a Mock Interview (Create Attempt)
router.post('/start', authenticateJWT, authorizeRoles('student'), async (req: AuthRequest, res: any) => {
    const { mock_interview_id } = req.body;
    const studentId = req.user?.id;

    try {
        // Check if already started
        const existing = await query(
            `SELECT * FROM mock_interview_attempts WHERE mock_interview_id = $1 AND student_id = $2`,
            [mock_interview_id, studentId]
        );

        if (existing.rows.length > 0) {
            return res.json(existing.rows[0]); // Return existing attempt
        }

        // Initialize with system prompt
        const initialHistory = [{
            role: 'system',
            content: `You are a professional technical interviewer conducting a mock interview.`
        }];

        try {
            const result = await query(
                `INSERT INTO mock_interview_attempts (mock_interview_id, student_id, conversation_history, status)
                VALUES ($1, $2, $3, 'in_progress')
                RETURNING *`,
                [mock_interview_id, studentId, JSON.stringify(initialHistory)]
            );
            res.status(201).json(result.rows[0]);
        } catch (err: any) {
            // Check for unique key violation (PostgreSQL code 23505)
            if (err.code === '23505') {
                 // Fetch and return the existing attempt
                 const existing = await query(
                    `SELECT * FROM mock_interview_attempts WHERE mock_interview_id = $1 AND student_id = $2`,
                    [mock_interview_id, studentId]
                 );
                 return res.json(existing.rows[0]);
            }
            throw err; // Re-throw other errors
        }
    } catch (err) {
        console.error('Error starting interview:', err);
        res.status(500).json({ error: 'Failed to start interview' });
    }
});

// Process Interaction (Speech-to-Text result sent here -> AI -> Text response)
router.post('/process-interaction', authenticateJWT, authorizeRoles('student'), async (req: AuthRequest, res: any) => {
    const { attempt_id, user_transcript } = req.body;
    // user_transcript is the text from the student's speech

    try {
        // 1. Fetch current attempt & interview details
        const attemptResult = await query(
            `SELECT mia.*, mi.domain, mi.topic, mi.difficulty, mi.description 
             FROM mock_interview_attempts mia
             JOIN mock_interviews mi ON mia.mock_interview_id = mi.id
             WHERE mia.id = $1`,
            [attempt_id]
        );

        if (attemptResult.rows.length === 0) return res.status(404).json({ error: 'Attempt not found' });
        const attempt = attemptResult.rows[0];
        const studentId = req.user?.id;
        
        if(attempt.student_id !== studentId) return res.status(403).json({ error: 'Unauthorized' });

        let history = attempt.conversation_history || [];

        // 2. Prepare AI Context if history is empty (first turn or just system prompt)
        if (history.length <= 1) { 
            const systemPrompt = `You are a strict but fair technical interviewer. 
            Interview Details:
            Domain: ${attempt.domain}
            Topic: ${attempt.topic}
            Difficulty: ${attempt.difficulty}
            Context/Instructions: ${attempt.description || 'None'}
            
            Your Goal: Conduct a realistic mock interview. 
            - Ask ONE question at a time.
            - Provide brief feedback on the user's answer if it's incorrect or vague, then move to the next question.
            - Keep responses conversational (for voice output).
            - Do NOT write code blocks unless asked.
            - Start by introducing yourself and asking the first question.`;
            
            // Update the system prompt
            history = [{ role: 'system', content: systemPrompt }];
        }

        // Check for question limit (approx 24 messages = 12 turns of user+assistant)
        // System prompt is index 0.
        // We want to force end if assistant message count >= 12.
        const assistantMsgCount = history.filter((m: any) => m.role === 'assistant').length;
        if (assistantMsgCount >= 12) {
             return res.json({ 
                response: "We have reached the end of the interview. Please click the 'End Interview' button to submit your answers and get feedback.",
                history: history 
             });
        }

        // 3. Append User Input
        if (user_transcript) {
            history.push({ role: 'user', content: user_transcript });
        }

        // 4. Call AI Model
        const hfClient = getHF();
        const aiResponse = await hfClient.chatCompletion({
            model: 'openai/gpt-oss-120b',
            messages: history,
            max_tokens: 500, // Keep it concise for voice
            temperature: 0.7,
        });

        const aiText = aiResponse.choices[0].message.content || "I didn't catch that. Could you repeat?";

        // 5. Append AI Response
        history.push({ role: 'assistant', content: aiText });

        // 6. Save Updated History
        await query(
            `UPDATE mock_interview_attempts SET conversation_history = $1, updated_at = now() WHERE id = $2`,
            [JSON.stringify(history), attempt_id]
        );

        // 7. Return AI text for TTS
        res.json({ 
            response: aiText,
            history: history 
        });

    } catch (err: any) {
        console.error('AI Interaction Error:', err);
        res.status(500).json({ error: 'AI processing failed' });
    }
});

// Submit/Finish Interview
router.post('/submit', authenticateJWT, authorizeRoles('student'), async (req: AuthRequest, res: any) => {
    const { attempt_id } = req.body;
    
    try {
        const attemptResult = await query(`SELECT * FROM mock_interview_attempts WHERE id = $1`, [attempt_id]);
        if (attemptResult.rows.length === 0) return res.status(404).json({ error: 'Attempt not found' });
        
        const history = attemptResult.rows[0].conversation_history;

        // Generate Final Feedback
        const feedbackPrompt = [
            ...history,
            { role: 'user', content: 'INTERVIEW_END. Please provide a final evaluation in JSON format only: { "score": number(0-100), "feedback": "summary text", "strengths": ["list"], "weaknesses": ["list"] }' }
        ];

        const hfClient = getHF();
        const aiResponse = await hfClient.chatCompletion({
            model: 'openai/gpt-oss-120b',
            messages: feedbackPrompt,
            max_tokens: 1000,
            temperature: 0.5,
        });

        const content = aiResponse.choices[0].message.content || "";
        
        let feedbackData = { score: 0, feedback: "Could not parse feedback", strengths: [], weaknesses: [] };
        try {
            const jsonMatch = content.match(/\{[\s\S]*\}/); // Improved regex for multi-line JSON
            if (jsonMatch) {
                feedbackData = JSON.parse(jsonMatch[0]);
            } else {
                 // Fallback if no JSON found
                 feedbackData.feedback = content;
            }
        } catch (e) {
            console.error('JSON Parse Error', e);
            feedbackData.feedback = content;
        }

        await query(
            `UPDATE mock_interview_attempts 
            SET status = 'completed', 
                feedback = $1, 
                score = $2, 
                updated_at = now() 
            WHERE id = $3`,
            [JSON.stringify(feedbackData), feedbackData.score || 0, attempt_id]
        );

        res.json({ success: true, feedback: feedbackData });
    } catch (err) {
        console.error('Error submitting interview:', err);
        res.status(500).json({ error: 'Failed to submit interview' });
    }
});

export default router;
