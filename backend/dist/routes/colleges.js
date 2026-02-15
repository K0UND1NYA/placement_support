"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("../db");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
// Public: Get active colleges for signup
router.get('/', async (req, res) => {
    try {
        const result = await (0, db_1.query)("SELECT id, name FROM colleges WHERE status = 'active' ORDER BY name ASC");
        res.json(result.rows);
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to fetch colleges' });
    }
});
// Admin: Add a college
router.post('/', auth_1.authenticateJWT, (0, auth_1.authorizeRoles)('admin'), async (req, res) => {
    const { name } = req.body;
    try {
        const result = await (0, db_1.query)("INSERT INTO colleges (name) VALUES ($1) RETURNING *", [name]);
        res.status(201).json(result.rows[0]);
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to create college' });
    }
});
exports.default = router;
