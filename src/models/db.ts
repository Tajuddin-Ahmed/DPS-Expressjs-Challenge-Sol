import sqlite3 from "sqlite3";
import path from "path";

const db = new sqlite3.Database(path.join(__dirname, "../../db/db.sqlite3"));

export default db;
