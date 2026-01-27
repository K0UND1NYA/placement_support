import express from 'express';
import { query } from '../db';
import { authenticateJWT, AuthRequest, authorizeRoles } from '../middleware/auth';

const router = express.Router();

// Start an attempt
router.post('/start', authenticateJWT, authorizeRoles('student'), async (req: AuthRequest, res: any) => {
    const { exam_id } = req.body;
    try {
        // Create attempt with null submitted_at and 0 score
        const result = await query(
            'INSERT INTO attempts (exam_id, student_id, score, submitted_at) VALUES ($1, $2, $3, $4) RETURNING id',
            [exam_id, req.user?.id, 0, null]
        );
        res.status(201).json({ attempt_id: result.rows[0].id });
    } catch (err) {
        console.error('Failed to start attempt:', err);
        res.status(500).json({ error: 'Failed to start attempt' });
    }
});

export default router;
