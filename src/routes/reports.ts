import express from "express";
import {
  getAllReports,
  createReport,
  updateReport,
  deleteReport,
  findReportsWithRepeatedWords,
} from "../models/reportModel";

const router = express.Router();

router.get("/", (req, res) => {
  const reports = getAllReports();
  res.json(reports);
});

router.get("/repeated-words", (req, res) => {
  const filteredReports = findReportsWithRepeatedWords();
  res.json(filteredReports);
});

router.post("/", (req, res) => {
  const { project_id, content } = req.body;
  const result = createReport(project_id, content);
  res.status(201).json(result);
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  updateReport(Number(id), content);
  res.json({ message: "Project updated successfully" });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  deleteReport(Number(id));
  res.json({ message: "Project deleted successfully" });
});

export default router;
