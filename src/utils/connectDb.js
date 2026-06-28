import { Pool } from "pg";
import { config } from "dotenv";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    port: process.env.DATABASE_URL ? undefined : process.env.DB_PORT,
    host: process.env.DATABASE_URL ? undefined : process.env.DB_HOST,
    database: process.env.DATABASE_URL ? undefined : process.env.DB_NAME,
    password: process.env.DATABASE_URL ? undefined : process.env.DB_PASSWORD,
    user: process.env.DATABASE_URL ? undefined : process.env.DB_USER,
    ssl: {
        rejectUnauthorized: false
    }
});

const initDatabase = async () => {
    try {
        const sqlPath = path.join(__dirname, '../data/init.sql');
        const sql = await fs.readFile(sqlPath, 'utf8');

        await pool.query(sql);
        console.log('Database tables initialized successfully.');
    } catch (err) {
        console.error('Error initializing database tables:', err);
    }
};

const connectDb = async () => {
    try {
        await pool.query('SELECT NOW()');
        console.log(' Database is connected and responding.');

        await initDatabase();
    } catch (err) {
        console.error(' Database connection failed:', err);
    }
};

pool.on('connect', () => {
    console.log('New client connected to the pool');
});

export default connectDb;
export { pool };