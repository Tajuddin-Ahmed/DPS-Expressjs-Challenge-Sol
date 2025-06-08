import db from "./db";
export interface Project {
  id?: number;
  name: string;
  description: string;
}

export const getAllProjects = (): Project[] => {
  try {
    return db.query("SELECT * FROM projects");
  } catch (error) {
    throw new Error("Failed to fetch projects");
  }
};

export const getProjectById = (id: number): Project => {
  try {
    const result = db.query("SELECT * FROM projects WHERE id = @id", { id });

    if (!result || result.length === 0) {
      throw new Error("Project not found");
    }

    const project = result[0] as Project;

    // Optional: Validate required fields manually
    if (!project.name || !project.description) {
      throw new Error("Invalid project data");
    }

    return project;
  } catch (error) {
    throw new Error(
      `Failed to fetch project by ID: ${(error as Error).message}`
    );
  }
};

export const createProject = (
  name: string,
  description: string
): { id: number } => {
  try {
    const result = db.run(
      "INSERT INTO projects (name, description) VALUES (@name, @description)",
      { name, description }
    );
    return { id: result.lastInsertRowid as number };
  } catch (error) {
    throw new Error("Failed to create project");
  }
};

export const updateProject = (
  id: number,
  name: string,
  description: string
): void => {
  try {
    db.run(
      "UPDATE projects SET name = @name, description = @description WHERE id = @id",
      { id, name, description }
    );
  } catch (error) {
    throw new Error("Failed to update project");
  }
};

export const deleteProject = (id: number): void => {
  try {
    db.run("DELETE FROM projects WHERE id = @id", { id });
  } catch (error) {
    throw new Error("Failed to delete project");
  }
};
