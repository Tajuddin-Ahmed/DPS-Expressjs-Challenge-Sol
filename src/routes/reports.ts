import express from "express";
import {
  getAllReports,
  createReport,
  findReportsWithRepeatedWords,
  updateReport,
  deleteReport,
} from "../models/reportModel";

const router = express.Router();

router.get("/", async (req: any, res: any) => res.json(await getAllReports()));
router.post("/", async (req, res) => {
  const { project_id, content } = req.body;
  res.json(await createReport(project_id, content));
});
router.put("/:id", async (req, res) => {
  const { content } = req.body;
  await updateReport(Number(req.params.id), content);
  res.json({ success: true });
});
router.delete("/:id", async (req, res) => {
  await deleteReport(Number(req.params.id));
  res.json({ success: true });
});
router.get("/repeated-words", async (req: any, res: any) =>
  res.json(await findReportsWithRepeatedWords())
);

export default router;
