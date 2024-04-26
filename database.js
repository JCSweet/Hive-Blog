import pg from "pg";
import dotenv from "dotenv";


dotenv.config();

const db = new pg.Client({
    user: process.env.PostgreSQL_USER,
    host: process.env.PostgreSQL_HOST,
    database: process.env.PostgreSQL_DATABASE,
    password: process.env.PostgreSQL_PASSWORD,
    port: process.env.PostgreSQL_PORT,
  });
  
  db.connect();