import express from "express";
import bodyParser from "body-parser";
import projectRoutes from "./routes/projects";

const app = express();
app.use(bodyParser.json());

app.use("/projects", projectRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
