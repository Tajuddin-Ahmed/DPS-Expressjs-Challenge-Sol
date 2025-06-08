import db from "./db";
export interface Project {
  id?: number;
  name: string;
  description: string;
}

export const getAllProjects = (): Promise<Project[]> => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM projects", [], (err, rows: any) => {
      err ? reject(err) : resolve(rows);
    });
  });
};

export const createProject = (
  name: string,
  description: string
): Promise<{ id: number }> => {
  return new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO projects (name, description) VALUES (?, ?)",
      [name, description],
      function (err) {
        err ? reject(err) : resolve({ id: this.lastID });
      }
    );
  });
};

export const getProjectById = (id: number): Promise<Project> => {
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM projects WHERE id = ?", [id], (err, row: any) => {
      err ? reject(err) : resolve(row);
    });
  });
};

export const updateProject = (
  id: number,
  name: string,
  description: string
): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.run(
      "UPDATE projects SET name = ?, description = ? WHERE id = ?",
      [name, description, id],
      function (err) {
        err ? reject(err) : resolve();
      }
    );
  });
};

export const deleteProject = (id: number): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.run("DELETE FROM projects WHERE id = ?", [id], function (err) {
      err ? reject(err) : resolve();
    });
  });
};
