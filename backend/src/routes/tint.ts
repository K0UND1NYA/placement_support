import express from 'express';
import { query } from '../db';
import { authenticateJWT, AuthRequest, authorizeRoles } from '../middleware/auth';
import { deleteLocalFile } from '../utils/fileStorage';
import { collegeIsolation } from '../middleware/isolation';

const router = express.Router();

// Get TINT materials
router.get('/', authenticateJWT, collegeIsolation, async (req: AuthRequest, res: any) => {
    try {
        let sql = 'SELECT * FROM tint_materials WHERE 1=1';
        const params: any[] = [];

        if (req.user?.role !== 'admin') {
            sql += ' AND college_id = $1';
            params.push(req.user?.college_id);

            if (req.user?.role === 'student') {
                sql += ` AND (year IS NULL OR year = '' OR year = (SELECT year FROM users WHERE id = $${params.length + 1}))`;
                params.push(req.user.id);
            }
        }

        const result = await query(sql, params);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch materials' });
    }
});

// Upload TINT material (TPO only)
router.post('/', authenticateJWT, authorizeRoles('tpo'), async (req: AuthRequest, res: any) => {
    const { title, category, file_url, year } = req.body;
    try {
        const result = await query(
            'INSERT INTO tint_materials (title, category, file_url, college_id, year) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [title, category, file_url, req.user?.college_id, year || null]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Failed to upload material' });
    }
});

// Delete TINT material (TPO only)
router.delete('/:id', authenticateJWT, authorizeRoles('tpo'), async (req: AuthRequest, res: any) => {
    const { id } = req.params;
    try {
        const collegeId = req.user?.college_id;

        // Fetch material first to get file_url
        const checkResult = await query(
            'SELECT id, file_url FROM tint_materials WHERE id = $1 AND college_id = $2',
            [id, collegeId]
        );

        if (checkResult.rows.length === 0) {
            return res.status(404).json({ error: 'Material not found or unauthorized' });
        }

        const material = checkResult.rows[0];

        await query('DELETE FROM tint_materials WHERE id = $1', [id]);

        // Attempt to delete local file
        if (material.file_url) {
            await deleteLocalFile(material.file_url);
        }

        res.json({ message: 'Material deleted successfully' });
    } catch (err) {
        console.error('Delete TINT Error:', err);
        res.status(500).json({ error: 'Failed to delete material' });
    }
});

export default router;
