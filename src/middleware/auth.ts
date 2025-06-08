import { Request, Response, NextFunction } from "express";
const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  const token = req.headers["authorization"];
  if (token !== "Password123") {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};
export default authMiddleware;
