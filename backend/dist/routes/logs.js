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
router.post('/', auth_1.authenticateJWT, async (req, res) => {
    const { attempt_id, type, metadata } = req.body;
    try {
        await (0, db_1.query)('INSERT INTO integrity_logs (attempt_id, type, metadata) VALUES ($1, $2, $3)', [attempt_id, type, JSON.stringify(metadata)]);
        res.status(201).json({ status: 'logged' });
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to log integrity event' });
    }
});
// Get logs for an attempt (TPO/Admin only)
router.get('/:attemptId', auth_1.authenticateJWT, async (req, res) => {
    const { attemptId } = req.params;
    try {
        // Basic role check - TPO or Admin
        if (req.user?.role === 'student') {
            return res.status(403).json({ error: 'Forbidden' });
        }
        const result = await (0, db_1.query)('SELECT * FROM integrity_logs WHERE attempt_id = $1', [attemptId]);
        res.json(result.rows);
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to fetch logs' });
    }
});
exports.default = router;
