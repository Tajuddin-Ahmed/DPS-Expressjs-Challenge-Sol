import db from "./db";

export interface Report {
  id?: number;
  project_id: number;
  content: string;
}

export const getAllReports = (): Report[] => {
  try {
    return db.query("SELECT * FROM reports");
  } catch (error) {
    throw new Error("Failed to fetch reports");
  }
};

export const createReport = (
  project_id: number,
  content: string
): { id: number } => {
  try {
    const result = db.run(
      "INSERT INTO reports (project_id, content) VALUES (@project_id, @content)",
      { project_id, content }
    );
    return { id: result.lastInsertRowid as number };
  } catch (error) {
    throw new Error("Failed to create report");
  }
};

export const updateReport = (id: number, content: string): void => {
  try {
    db.run("UPDATE reports SET content = @content WHERE id = @id", {
      id,
      content,
    });
  } catch (error) {
    throw new Error("Failed to update report");
  }
};

export const deleteReport = (id: number): void => {
  try {
    db.run("DELETE FROM reports WHERE id = @id", { id });
  } catch (error) {
    throw new Error("Failed to delete report");
  }
};

export const findReportsWithRepeatedWords = (): Report[] => {
  try {
    const reports: Report[] = db.query("SELECT * FROM reports");

    return reports.filter((report) => {
      const words = report.content.toLowerCase().split(/\W+/);
      const freq: Record<string, number> = {};
      for (const word of words) {
        freq[word] = (freq[word] || 0) + 1;
      }
      return Object.values(freq).some((count) => count >= 3);
    });
  } catch (error) {
    throw new Error("Failed to find repeated word reports");
  }
};
