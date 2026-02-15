"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("../db");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
// Get global stats
router.get('/stats', auth_1.authenticateJWT, (0, auth_1.authorizeRoles)('admin'), async (req, res) => {
    try {
        const colleges = await (0, db_1.query)('SELECT COUNT(*) FROM colleges');
        const users = await (0, db_1.query)('SELECT COUNT(*) FROM users');
        const exams = await (0, db_1.query)('SELECT COUNT(*) FROM exams');
        const attempts = await (0, db_1.query)('SELECT COUNT(*) FROM attempts');
        res.json({
            colleges: colleges.rows[0].count,
            users: users.rows[0].count,
            exams: exams.rows[0].count,
            attempts: attempts.rows[0].count
        });
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to fetch global stats' });
    }
});
// Get global integrity logs
router.get('/integrity-logs', auth_1.authenticateJWT, (0, auth_1.authorizeRoles)('admin'), async (req, res) => {
    try {
        const result = await (0, db_1.query)(`
            SELECT il.*, a.exam_id, e.title as exam_title, u.name as student_name
            FROM integrity_logs il
            JOIN attempts a ON il.attempt_id = a.id
            JOIN exams e ON a.exam_id = e.id
            JOIN users u ON a.student_id = u.id
            ORDER BY il.created_at DESC
            LIMIT 100
        `);
        res.json(result.rows);
    }
    catch (err) {
        console.error('Integrity Logs Error:', err);
        res.status(500).json({ error: 'Failed to fetch global logs' });
    }
});
// Get comprehensive analytics
router.get('/analytics', auth_1.authenticateJWT, (0, auth_1.authorizeRoles)('admin'), async (req, res) => {
    try {
        // Daily registrations (last 30 days)
        const registrations = await (0, db_1.query)(`
            SELECT date_trunc('day', created_at) as date, COUNT(*) as count
            FROM users
            WHERE created_at > now() - interval '30 days'
            GROUP BY date
            ORDER BY date ASC
        `);
        // Daily exam attempts (last 30 days)
        const attempts = await (0, db_1.query)(`
            SELECT date_trunc('day', submitted_at) as date, COUNT(*) as count
            FROM attempts
            WHERE submitted_at > now() - interval '30 days'
            GROUP BY date
            ORDER BY date ASC
        `);
        // Role distribution
        const roles = await (0, db_1.query)(`
            SELECT role, COUNT(*) as count
            FROM users
            GROUP BY role
        `);
        // Integrity issue breakdown
        const integrityDist = await (0, db_1.query)(`
            SELECT type, COUNT(*) as count
            FROM integrity_logs
            GROUP BY type
        `);
        res.json({
            registrations: registrations.rows,
            attempts: attempts.rows,
            roles: roles.rows,
            integrityDistribution: integrityDist.rows
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch analytics data' });
    }
});
exports.default = router;
