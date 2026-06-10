import pool from "./db";
import fs from "fs";
import path from "path";

export async function initDb() {
  const sql = fs.readFileSync(path.join(process.cwd(), "lib/schema.sql"), "utf8");
  await pool.query(sql);
}