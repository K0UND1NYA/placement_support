import { supabase } from '../supabase';

/**
 * Deletes a file from Supabase Storage if the provided URL points to one.
 * @param fileUrl The Public URL of the file
 */
export async function deleteLocalFile(fileUrl: string | null | undefined): Promise<void> {
    if (!fileUrl) return;

    try {
        // Look for our specific bucket name in the URL to identify Supabase files
        if (fileUrl.includes('/storage/v1/object/public/materials/')) {
            // Extract the relative path after the bucket name
            const parts = fileUrl.split('/materials/');
            if (parts.length > 1) {
                const filePath = parts[parts.length - 1];

                const { error } = await supabase.storage
                    .from('materials')
                    .remove([filePath]);

                if (error) {
                    console.error('Supabase Delete Error:', error);
                } else {
                    console.log(`Deleted Supabase file: ${filePath}`);
                }
            }
        }
    } catch (err) {
        console.error(`Error deleting Supabase file ${fileUrl}:`, err);
    }
}
