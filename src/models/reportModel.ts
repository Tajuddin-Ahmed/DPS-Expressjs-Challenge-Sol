import db from "./db";
export interface Report {
  id?: number;
  project_id: number;
  content: string;
}

export const getAllReports = (): Promise<Report[]> => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM reports", [], (err, rows: any) => {
      err ? reject(err) : resolve(rows);
    });
  });
};

export const createReport = (
  project_id: number,
  content: string
): Promise<{ id: number }> => {
  return new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO reports (project_id, content) VALUES (?, ?)",
      [project_id, content],
      function (err) {
        err ? reject(err) : resolve({ id: this.lastID });
      }
    );
  });
};
export const updateReport = (id: number, content: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.run(
      "UPDATE reports SET content = ? WHERE id = ?",
      [content, id],
      function (err) {
        err ? reject(err) : resolve();
      }
    );
  });
};
export const deleteReport = (id: number): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.run("DELETE FROM reports WHERE id = ?", [id], function (err) {
      err ? reject(err) : resolve();
    });
  });
};

export const findReportsWithRepeatedWords = (): Promise<Report[]> => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM reports", [], (err, rows: Report[]) => {
      if (err) return reject(err);

      const filtered = rows.filter((report) => {
        const words = report.content.toLowerCase().split(/\W+/);
        const freq: Record<string, number> = {};
        for (const word of words) {
          freq[word] = (freq[word] || 0) + 1;
        }
        return Object.values(freq).some((count) => count >= 3);
      });

      resolve(filtered);
    });
  });
};
