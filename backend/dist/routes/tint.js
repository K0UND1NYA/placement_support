"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("../db");
const auth_1 = require("../middleware/auth");
const isolation_1 = require("../middleware/isolation");
const router = express_1.default.Router();
// Get TINT materials
router.get('/', auth_1.authenticateJWT, isolation_1.collegeIsolation, async (req, res) => {
    try {
        let sql = 'SELECT * FROM tint_materials WHERE 1=1';
        const params = [];
        if (req.user?.role !== 'admin') {
            sql += ' AND college_id = $1';
            params.push(req.user?.college_id);
        }
        const result = await (0, db_1.query)(sql, params);
        res.json(result.rows);
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to fetch materials' });
    }
});
// Upload TINT material (TPO only)
router.post('/', auth_1.authenticateJWT, (0, auth_1.authorizeRoles)('tpo'), async (req, res) => {
    const { title, category, file_url } = req.body;
    try {
        const result = await (0, db_1.query)('INSERT INTO tint_materials (title, category, file_url, college_id) VALUES ($1, $2, $3, $4) RETURNING *', [title, category, file_url, req.user?.college_id]);
        res.status(201).json(result.rows[0]);
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to upload material' });
    }
});
exports.default = router;
