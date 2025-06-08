import express from "express";
import bodyParser from "body-parser";

import projectRoutes from "./routes/projects";
import reportRoutes from "./routes/reports";
import authMiddleware from "./middleware/auth";

const app = express();
app.use(bodyParser.json());

app.use("/api/reports", authMiddleware, reportRoutes);
app.use("/api/projects", authMiddleware, projectRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
