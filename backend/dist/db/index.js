"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.query = void 0;
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
// Load .env.local from project root
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../../../.env.local') });
const pool = new pg_1.Pool({
    connectionString: process.env.DATABASE_URL || "postgresql://postgres:postgres@localhost:5432/postgres",
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    idleTimeoutMillis: 60000,
    connectionTimeoutMillis: 10000,
    max: 20
});
pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
});
const query = async (text, params, retries = 3) => {
    for (let i = 0; i < retries; i++) {
        try {
            return await pool.query(text, params);
        }
        catch (err) {
            console.log(`[DB] Query attempt ${i + 1} failed:`, err.message);
            const isRetryable = err.message.toLowerCase().includes('timeout') ||
                err.code === 'ECONNRESET' ||
                err.message.toLowerCase().includes('connection terminated') ||
                err.message.toLowerCase().includes('unexpectedly');
            if (i === retries - 1 || !isRetryable) {
                throw err;
            }
            console.warn(`[DB] Retrying (${i + 1}/${retries})...`);
            // Exponential backoff
            await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
        }
    }
};
exports.query = query;
exports.default = pool;
