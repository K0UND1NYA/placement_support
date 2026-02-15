"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("../db");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
// Log integrity event
router.post('/log', auth_1.authenticateJWT, (0, auth_1.authorizeRoles)('student'), async (req, res) => {
    const { attempt_id, type, metadata } = req.body;
    if (!attempt_id) {
        return res.status(400).json({ error: 'attempt_id is required' });
    }
    try {
        // Verify attempt belongs to student
        const attemptCheck = await (0, db_1.query)('SELECT id FROM attempts WHERE id = $1 AND student_id = $2', [attempt_id, req.user?.id]);
        if (attemptCheck.rows.length === 0) {
            return res.status(403).json({ error: 'Invalid attempt ID' });
        }
        await (0, db_1.query)('INSERT INTO integrity_logs (attempt_id, type, metadata) VALUES ($1, $2, $3)', [attempt_id, type, JSON.stringify(metadata)]);
        res.status(201).json({ status: 'logged' });
    }
    catch (err) {
        console.error('Integrity log error:', err);
        res.status(500).json({ error: 'Failed to log integrity event' });
    }
});
exports.default = router;
