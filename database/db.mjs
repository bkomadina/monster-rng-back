import postgres from 'postgres';

const sql = postgres({
  host: 'localhost',
  port: 5432,
  user: 'admin',
  password: 'kitun75',
  database: 'monsters',
  // ssl: { rejectUnauthorized: false }, // if you're using SSL
});

export default sql;