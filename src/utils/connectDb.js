import { Pool } from "pg";
import { config } from "dotenv";

config();


const pool = new Pool({
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    user: process.env.DB_USER,
});


const connectDb = async () => {
    await pool.connect()
    pool.on('connect', () => {
        console.log('database is connected');

    })
}

export default connectDb
export { pool }