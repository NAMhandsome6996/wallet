import express from "express";
import dotenv from "dotenv";
import { sql } from "./config/db.js";
dotenv.config();

const app = express();

const PORT = process.env.PORT || 6969;

async function initDB() {
  try {
    await sql`CREATE TABLE IF NOT EXISTS transaction(
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    category VARCHAR(255) NOT NULL,
    create_at DATE NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`;
    console.log("DATAbase initialized sucessfully");
  } catch (error) {
    console.error("error ", error);
    process.exit(1);
  }
}
app.get("/", (req, res) => {
  res.send("hai");
});

initDB().then(() => {
  app.listen(PORT, () => {
    console.log("server is running on http://localhost:", PORT);
  });
});
console.log("my port: ", process.env.PORT);
 