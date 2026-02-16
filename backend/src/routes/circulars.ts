import express from 'express';
import { query } from '../db';
import { authenticateJWT, AuthRequest, authorizeRoles } from '../middleware/auth';
import { deleteLocalFile } from '../utils/fileStorage';

const router = express.Router();

// GET all circulars for the user's college
router.get('/', authenticateJWT, async (req: AuthRequest, res: any) => {
    try {
        const collegeId = req.user?.college_id;
        if (!collegeId) {
            return res.status(400).json({ error: 'User is not associated with a college' });
        }

        const result = await query(`
            SELECT 
                c.*, 
                u.name as creator_name 
            FROM circulars c
            LEFT JOIN users u ON c.created_by = u.id
            WHERE c.college_id = $1
            ${req.user?.role === 'student' ? "AND (c.year IS NULL OR c.year = '' OR c.year = (SELECT year FROM users WHERE id = $2))" : ""}
            ORDER BY c.created_at DESC
        `, req.user?.role === 'student' ? [collegeId, req.user.id] : [collegeId]);

        res.json(result.rows);
    } catch (err) {
        console.error('Fetch Circulars Error:', err);
        res.status(500).json({ error: 'Failed to fetch circulars' });
    }
});

// POST a new circular (TPO only)
router.post('/', authenticateJWT, authorizeRoles('tpo'), async (req: AuthRequest, res: any) => {
    const { title, content, attachment_url } = req.body;

    if (!title || !content) {
        return res.status(400).json({ error: 'Title and content are required' });
    }

    try {
        const collegeId = req.user?.college_id;
        const userId = req.user?.id;
        const { year } = req.body;

        const result = await query(`
            INSERT INTO circulars (college_id, title, content, created_by, attachment_url, year)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *
        `, [collegeId, title, content, userId, attachment_url || null, year || null]);

        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Create Circular Error:', err);
        res.status(500).json({ error: 'Failed to create circular' });
    }
});

// DELETE a circular (TPO only)
router.delete('/:id', authenticateJWT, authorizeRoles('tpo'), async (req: AuthRequest, res: any) => {
    const { id } = req.params;

    try {
        const collegeId = req.user?.college_id;

        // Ensure the circular belongs to the TPO's college and fetch its attachment_url
        const checkResult = await query(
            'SELECT id, attachment_url FROM circulars WHERE id = $1 AND college_id = $2',
            [id, collegeId]
        );

        if (checkResult.rows.length === 0) {
            return res.status(404).json({ error: 'Circular not found or unauthorized' });
        }

        const circular = checkResult.rows[0];

        await query('DELETE FROM circulars WHERE id = $1', [id]);

        // Attempt to delete local file if it exists
        if (circular.attachment_url) {
            await deleteLocalFile(circular.attachment_url);
        }
        res.json({ message: 'Circular deleted successfully' });
    } catch (err) {
        console.error('Delete Circular Error:', err);
        res.status(500).json({ error: 'Failed to delete circular' });
    }
});

export default router;
