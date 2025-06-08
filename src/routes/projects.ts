import express from "express";
import {
  createProject,
  deleteProject,
  getAllProjects,
  getProjectById,
  updateProject,
} from "../models/projectModel";
import { Request, Response } from "express";

const router = express.Router();

// Get all projects route

router.get("/", (req: Request, res: Response) => {
  const projects = getAllProjects();
  res.json(projects);
});

// Get a single project route

router.get("/:id", (req: Request, res: Response) => {
  const project = getProjectById(parseInt(req.params.id));
  if (project) {
    res.json(project);
  } else {
    res.status(404).json({ error: "Project not found" });
  }
});

// Create a new project route

router.post("/", (req: Request, res: Response) => {
  const { name, description } = req.body;
  const newProject = createProject(name, description);
  res.status(201).json(newProject);
});

// Update a single project route

router.put("/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { name, description } = req.body;
  updateProject(id, name, description);
  res.json({ message: "Project updated successfully" });
});

// delete a single project route

router.delete("/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  deleteProject(id);
  res.json({ message: "Project deleted successfully" });
});

export default router;
