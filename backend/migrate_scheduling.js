const { Pool } = require('pg');
const pool = new Pool({
    connectionString: 'postgresql://postgres:QnSa7eOwBZ0RJCmu@db.ejyqanokuelzxbaozygb.supabase.co:5432/postgres',
    ssl: { rejectUnauthorized: false }
});

async function migrate() {
    try {
        console.log('Checking for start_time and end_time columns in exams table...');

        // Add start_time if it doesn't exist
        await pool.query(`
            ALTER TABLE exams 
            ADD COLUMN IF NOT EXISTS start_time timestamp with time zone,
            ADD COLUMN IF NOT EXISTS end_time timestamp with time zone
        `);

        console.log('Migration successful: start_time and end_time columns added to exams table.');
    } catch (e) {
        console.error('Migration failed:', e.message);
    } finally {
        await pool.end();
    }
}

migrate();
