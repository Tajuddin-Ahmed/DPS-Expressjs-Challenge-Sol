import sqlite from "better-sqlite3";
import path from "path";

const db = new sqlite(path.resolve("./db/db.sqlite3"), {
  fileMustExist: true,
});

function query<T extends Record<string, any>>(
  sql: string,
  params?: { [key: string]: string | number | undefined }
): T[] {
  return params
    ? (db.prepare(sql).all(params) as T[])
    : (db.prepare(sql).all() as T[]);
}

function run(
  sql: string,
  params?: { [key: string]: string | number | undefined }
) {
  return params ? db.prepare(sql).run(params) : db.prepare(sql).run();
}

db.exec(`
      CREATE TABLE IF NOT EXISTS projects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT
      );

  
      CREATE TABLE IF NOT EXISTS reports (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        project_id INTEGER,
        content TEXT,
        FOREIGN KEY (project_id) REFERENCES projects(id)
      );
`);

export default { query, run };
