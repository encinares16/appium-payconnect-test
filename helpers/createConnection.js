import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config({ quiet: true });

export const connection = await mysql.createConnection({
    host: process.env.DB_TEST_HOST,
    user: process.env.DB_TEST_USER,
    password: process.env.DB_TEST_PASSWORD,
    database: process.env.DB_TEST_NAME,
    port: process.env.DB_TEST_PORT,
});