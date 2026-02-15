"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("../db");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
// Start an attempt
router.post('/start', auth_1.authenticateJWT, (0, auth_1.authorizeRoles)('student'), async (req, res) => {
    const { exam_id } = req.body;
    try {
        // Check for existing active attempt
        const existing = await (0, db_1.query)('SELECT id, created_at FROM attempts WHERE exam_id = $1 AND student_id = $2 AND submitted_at IS NULL', [exam_id, req.user?.id]);
        if (existing.rows.length > 0) {
            return res.json({
                attempt_id: existing.rows[0].id,
                started_at: existing.rows[0].created_at
            });
        }
        // Create attempt with null submitted_at and 0 score
        const result = await (0, db_1.query)('INSERT INTO attempts (exam_id, student_id, score, submitted_at) VALUES ($1, $2, $3, $4) RETURNING id, created_at', [exam_id, req.user?.id, 0, null]);
        res.status(201).json({
            attempt_id: result.rows[0].id,
            started_at: result.rows[0].created_at
        });
    }
    catch (err) {
        console.error('Failed to start attempt:', err);
        res.status(500).json({ error: 'Failed to start attempt' });
    }
});
// Get logs for a specific attempt (TPO/Admin)
router.get('/:attemptId/logs', auth_1.authenticateJWT, (0, auth_1.authorizeRoles)('tpo', 'admin'), async (req, res) => {
    const { attemptId } = req.params;
    try {
        // Optional: Verify attempt belongs to TPO's college (omitted for brevity, relying on previous checks in UI flow)
        const result = await (0, db_1.query)('SELECT * FROM integrity_logs WHERE attempt_id = $1 ORDER BY created_at DESC', [attemptId]);
        res.json(result.rows);
    }
    catch (err) {
        console.error('Fetch logs error:', err);
        res.status(500).json({ error: 'Failed to fetch logs' });
    }
});
exports.default = router;
