"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("../db");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
// Get Profile
router.get('/', auth_1.authenticateJWT, async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId)
            return res.status(401).json({ error: 'Unauthorized' });
        const result = await (0, db_1.query)('SELECT id, name, email, role, college_id, usn, section, year, branch FROM users WHERE id = $1', [userId]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(result.rows[0]);
    }
    catch (err) {
        console.error('Get profile error:', err);
        res.status(500).json({ error: 'Failed to fetch profile' });
    }
});
// Update Profile
router.put('/', auth_1.authenticateJWT, async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId)
            return res.status(401).json({ error: 'Unauthorized' });
        const { name, email, usn, section, year, branch } = req.body;
        // Check for email uniqueness if email is changing
        if (email) {
            const emailCheck = await (0, db_1.query)('SELECT id FROM users WHERE email = $1 AND id != $2', [email, userId]);
            if (emailCheck.rows.length > 0) {
                return res.status(400).json({ error: 'Email already in use' });
            }
        }
        const result = await (0, db_1.query)(`UPDATE users 
       SET name = COALESCE($1, name), 
           email = COALESCE($2, email), 
           usn = COALESCE($3, usn), 
           section = COALESCE($4, section), 
           year = COALESCE($5, year), 
           branch = COALESCE($6, branch)
       WHERE id = $7 
       RETURNING id, name, email, role, college_id, usn, section, year, branch`, [name, email, usn, section, year, branch, userId]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(result.rows[0]);
    }
    catch (err) {
        console.error('Update profile error:', err);
        res.status(500).json({ error: 'Failed to update profile' });
    }
});
exports.default = router;
