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

router.get("/", (req: Request, res: Response) => {
  const projects = getAllProjects();
  res.json(projects);
});

router.get("/:id", (req: Request, res: Response) => {
  const project = getProjectById(parseInt(req.params.id));
  if (project) {
    res.json(project);
  } else {
    res.status(404).json({ error: "Project not found" });
  }
});

router.post("/", (req: Request, res: Response) => {
  const { name, description } = req.body;
  const newProject = createProject(name, description);
  res.status(201).json(newProject);
});

router.put("/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { name, description } = req.body;
  updateProject(id, name, description);
  res.json({ message: "Project updated successfully" });
});

router.delete("/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  deleteProject(id);
  res.json({ message: "Project deleted successfully" });
});

export default router;
