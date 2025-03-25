import knex from "knex";
import dotenv from "dotenv";

dotenv.config(); //Cargar variables de entorno

const db = knex({
  client: "pg", // PostgreSQL
  connection: {
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    user: process.env.PGUSER,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    ssl: { rejectUnauthorized: false },
  },
});


export default db;
