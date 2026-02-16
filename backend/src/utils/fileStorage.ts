import fs from 'fs';
import path from 'path';

/**
 * Deletes a local file if the provided URL points to one.
 * @param fileUrl The URL of the file (can be absolute or relative)
 */
export async function deleteLocalFile(fileUrl: string | null | undefined): Promise<void> {
    if (!fileUrl) return;

    try {
        // We look for the pattern "/uploads/" in the URL
        if (fileUrl.includes('/uploads/')) {
            // Extract the filename. The URL usually ends with /uploads/filename.ext
            const parts = fileUrl.split('/uploads/');
            if (parts.length > 1) {
                const filename = parts[parts.length - 1];
                const filePath = path.join(__dirname, '../../uploads', filename);

                // Check if file exists before trying to delete
                if (fs.existsSync(filePath)) {
                    await fs.promises.unlink(filePath);
                    console.log(`Deleted local file: ${filePath}`);
                }
            }
        }
    } catch (err) {
        console.error(`Error deleting local file ${fileUrl}:`, err);
        // We don't throw here to avoid failing the whole request if file deletion fails
    }
}
