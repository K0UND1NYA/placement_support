import express from 'express';
import { query } from '../db';
import { authenticateJWT, AuthRequest, authorizeRoles } from '../middleware/auth';

const router = express.Router();

// Log integrity event
router.post('/log', authenticateJWT, authorizeRoles('student'), async (req: AuthRequest, res: any) => {
    const { attempt_id, type, metadata } = req.body;
    
    if (!attempt_id) {
        return res.status(400).json({ error: 'attempt_id is required' });
    }

    try {
        // Verify attempt belongs to student
        const attemptCheck = await query(
            'SELECT id FROM attempts WHERE id = $1 AND student_id = $2',
            [attempt_id, req.user?.id]
        );
        
        if (attemptCheck.rows.length === 0) {
            return res.status(403).json({ error: 'Invalid attempt ID' });
        }

        await query(
            'INSERT INTO integrity_logs (attempt_id, type, metadata) VALUES ($1, $2, $3)',
            [attempt_id, type, JSON.stringify(metadata)]
        );
        res.status(201).json({ status: 'logged' });
    } catch (err) {
        console.error('Integrity log error:', err);
        res.status(500).json({ error: 'Failed to log integrity event' });
    }
});

export default router;
