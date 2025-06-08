import sqlite3 from "sqlite3";
import path from "path";

const db = new sqlite3.Database(path.join(__dirname, "../../db/db.sqlite3"));
db.serialize(() => {
  db.run(`
      CREATE TABLE IF NOT EXISTS projects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT
      )
    `);

  db.run(`
      CREATE TABLE IF NOT EXISTS reports (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        project_id INTEGER,
        content TEXT,
        FOREIGN KEY (project_id) REFERENCES projects(id)
      )
    `);
});

export default db;
