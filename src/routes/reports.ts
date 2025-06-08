import express from "express";
import {
  getAllReports,
  createReport,
  updateReport,
  deleteReport,
  findReportsWithRepeatedWords,
} from "../models/reportModel";

const router = express.Router();

// Get all report route

router.get("/", (req, res) => {
  const reports = getAllReports();
  res.json(reports);
});

// Get 3 repeated words report route

router.get("/repeated-words", (req, res) => {
  const filteredReports = findReportsWithRepeatedWords();
  res.json(filteredReports);
});

// Create a new report route

router.post("/", (req, res) => {
  const { project_id, content } = req.body;
  const result = createReport(project_id, content);
  res.status(201).json(result);
});

// update a single report route

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  updateReport(Number(id), content);
  res.json({ message: "Project updated successfully" });
});

// Delete a single report route

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  deleteReport(Number(id));
  res.json({ message: "Project deleted successfully" });
});

export default router;
