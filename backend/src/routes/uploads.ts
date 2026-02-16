import express from 'express';
import multer from 'multer';
import path from 'path';
import { authenticateJWT, AuthRequest, authorizeRoles } from '../middleware/auth';

const router = express.Router();

// Multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../uploads'));
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

// File filter to only allow PDFs and Images (optional, but good for security)
const fileFilter = (req: any, file: any, cb: any) => {
    const allowedTypes = ['.pdf', '.png', '.jpg', '.jpeg'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedTypes.includes(ext)) {
        cb(null, true);
    } else {
        cb(new Error('Only PDF and images are allowed'));
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// Post a file (TPO only)
router.post('/', authenticateJWT, authorizeRoles('tpo'), upload.single('file'), (req: AuthRequest, res: any) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        // Construct the URL to the file
        // Note: In production, you'd use a full base URL or cloud storage URL
        const fileUrl = `/uploads/${req.file.filename}`;

        res.json({
            success: true,
            file_url: fileUrl,
            filename: req.file.originalname
        });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
