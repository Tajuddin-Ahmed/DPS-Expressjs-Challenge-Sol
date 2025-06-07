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
