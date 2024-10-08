import postgres from 'postgres';
import { config } from 'dotenv';

config();

const sql = postgres({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export default sql;
