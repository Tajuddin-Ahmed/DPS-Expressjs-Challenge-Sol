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

router.get("/", async (req: Request, res: Response) => {
  try {
    const projects = await getAllProjects();
    res.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ error: "Failed to fetch projects" });
  }
});
router.get("/:id", async (req: any, res: any) =>
  res.json(await getProjectById(Number(req.params.id)))
);

router.post("/", async (req, res) => {
  const { name, description } = req.body;
  res.json(await createProject(name, description));
});

router.put("/:id", async (req, res) => {
  const { name, description } = req.body;
  await updateProject(Number(req.params.id), name, description);
  res.json({ success: true });
});

router.delete("/:id", async (req, res) => {
  await deleteProject(Number(req.params.id));
  res.json({ success: true });
});

export default router;
