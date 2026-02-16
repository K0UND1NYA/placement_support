import express from 'express';
import multer from 'multer';
import { authenticateJWT, AuthRequest, authorizeRoles } from '../middleware/auth';
import { supabase } from '../supabase';
import path from 'path';

const router = express.Router();

// Use Memory Storage for Multer to send buffer to Supabase
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// Post a file (TPO only) to Supabase Storage
router.post('/', authenticateJWT, authorizeRoles('tpo'), upload.single('file'), async (req: AuthRequest, res: any) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const file = req.file;
        const fileExt = path.extname(file.originalname).toLowerCase();
        const fileName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${fileExt}`;
        const filePath = `materials/${fileName}`;

        // Upload to Supabase 'materials' bucket
        const { data, error } = await supabase.storage
            .from('materials')
            .upload(filePath, file.buffer, {
                contentType: file.mimetype,
                upsert: false
            });

        if (error) {
            console.error('Supabase Upload Error:', error);
            return res.status(500).json({ error: error.message });
        }

        // Get Public URL
        const { data: { publicUrl } } = supabase.storage
            .from('materials')
            .getPublicUrl(filePath);

        res.json({
            success: true,
            file_url: publicUrl,
            filename: file.originalname
        });
    } catch (err: any) {
        console.error('Upload catch error:', err);
        res.status(500).json({ error: err.message });
    }
});

export default router;
