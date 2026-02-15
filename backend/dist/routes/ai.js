"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const inference_1 = require("@huggingface/inference");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
// Initialize Hugging Face Inference
// Note: HF_TOKEN should be in .env.local or environment variables
const hf = new inference_1.HfInference(process.env.HF_TOKEN);
router.post('/generate-questions', auth_1.authenticateJWT, (0, auth_1.authorizeRoles)('tpo'), async (req, res) => {
    const { pattern, type, count, description, difficulty } = req.body;
    if (!pattern || !type || !count) {
        return res.status(400).json({ error: 'Missing required parameters: pattern, type, count' });
    }
    try {
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
        const response = await hf.textGeneration({
            model: 'mistralai/Mistral-7B-Instruct-v0.2',
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
        }
        else {
            // If no array found, try to clean up markers
            content = content.replace(/```json/g, '').replace(/```/g, '').trim();
        }
        try {
            const questions = JSON.parse(content);
            res.json({ questions });
        }
        catch (parseError) {
            console.error('Failed to parse AI response:', content);
            res.status(500).json({
                error: 'The AI generated content in an invalid format. Please try again with a more specific topic.',
                raw: content
            });
        }
    }
    catch (err) {
        console.error('AI Generation Error:', err);
        res.status(500).json({ error: 'AI generation failed', details: err.message });
    }
});
exports.default = router;
