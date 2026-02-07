import express from 'express';
import { query } from '../db';
import { authenticateJWT, AuthRequest, authorizeRoles } from '../middleware/auth';

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
            ORDER BY c.created_at DESC
        `, [collegeId]);

        res.json(result.rows);
    } catch (err) {
        console.error('Fetch Circulars Error:', err);
        res.status(500).json({ error: 'Failed to fetch circulars' });
    }
});

// POST a new circular (TPO only)
router.post('/', authenticateJWT, authorizeRoles('tpo'), async (req: AuthRequest, res: any) => {
    const { title, content } = req.body;
    
    if (!title || !content) {
        return res.status(400).json({ error: 'Title and content are required' });
    }

    try {
        const collegeId = req.user?.college_id;
        const userId = req.user?.id;

        const result = await query(`
            INSERT INTO circulars (college_id, title, content, created_by)
            VALUES ($1, $2, $3, $4)
            RETURNING *
        `, [collegeId, title, content, userId]);

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

        // Ensure the circular belongs to the TPO's college
        const checkResult = await query(
            'SELECT id FROM circulars WHERE id = $1 AND college_id = $2',
            [id, collegeId]
        );

        if (checkResult.rows.length === 0) {
            return res.status(404).json({ error: 'Circular not found or unauthorized' });
        }

        await query('DELETE FROM circulars WHERE id = $1', [id]);
        res.json({ message: 'Circular deleted successfully' });
    } catch (err) {
        console.error('Delete Circular Error:', err);
        res.status(500).json({ error: 'Failed to delete circular' });
    }
});

export default router;
