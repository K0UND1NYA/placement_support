import express from 'express';
import { InferenceClient } from '@huggingface/inference';
import { authenticateJWT, AuthRequest, authorizeRoles } from '../middleware/auth';

const router = express.Router();

// Initialize Hugging Face Inference lazily to avoid crash if token is missing at startup
let hf: InferenceClient | null = null;
const getHF = () => {
    if (!hf) {
        if (!process.env.HF_TOKEN) {
            throw new Error('HF_TOKEN is missing in environment variables (.env.local)');
        }
        hf = new InferenceClient(process.env.HF_TOKEN);
    }
    return hf;
};

router.post('/generate-questions', authenticateJWT, authorizeRoles('tpo'), async (req: AuthRequest, res: any) => {
    const { pattern, type, count, description, difficulty } = req.body;

    if (!pattern || !type || !count) {
        return res.status(400).json({ error: 'Missing required parameters: pattern, type, count' });
    }

    try {
        const hfClient = getHF();
        const prompt = `Generate ${count} high-quality multiple-choice questions for a placement exam from a REAL-TIME INDUSTRY PERSPECTIVE (current standards 2025-2026).
Topic Category: ${type}
Question Pattern: ${pattern}
Difficulty Level: ${difficulty || 'Medium'}
Additional Context/Specifics: ${description || 'Apply general industry-standard placement questions for the topic.'}

Requirements:
1. Each question must be unique, professional, and relevant to modern placement tests (like TCS NQT, Infosys, Google, etc.).
2. Each question must have exactly 4 distinct, plausible options.
3. Each question must have one clearly correct answer which must be exactly one of the options.
4. Return the response ONLY as a JSON array of objects. Do not include any other text, markdown formatting like \`\`\`json, or explanation.
5. Each object must follow this structure:
{
  "question": "The question text",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "correct_answer": "Option A"
}

Questions:`;

        const response = await hfClient.textGeneration({
            model: 'mistralai/Mistral-7B-Instruct-v0.3',
            inputs: prompt,
            parameters: {
                max_new_tokens: 3000,
                return_full_text: false,
                temperature: 0.8,
                repetition_penalty: 1.2,
            }
        });

        let content = response.generated_text.trim();

        // Robust JSON extraction
        const jsonMatch = content.match(/\[\s*\{.*\}\s*\]/s);
        if (jsonMatch) {
            content = jsonMatch[0];
        } else {
            // If no array found, try to clean up markers
            content = content.replace(/```json/g, '').replace(/```/g, '').trim();
        }

        try {
            const questions = JSON.parse(content);
            res.json({ questions });
        } catch (parseError) {
            console.error('Failed to parse AI response:', content);
            res.status(500).json({
                error: 'The AI generated content in an invalid format. Please try again with a more specific topic.',
                details: 'AI response was not a valid ZIP array.',
                raw: content
            });
        }

    } catch (err: any) {
        console.error('AI Generation Error:', err);
        const status = err.message.includes('HF_TOKEN') ? 501 : 500;
        res.status(status).json({
            error: err.message.includes('HF_TOKEN') ? 'AI Service not configured' : 'AI generation failed',
            details: err.message
        });
    }
});

export default router;
