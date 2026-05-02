import jwt from "jsonwebtoken";
import FacultyModel from "../models/faculty.js";

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authorization token required",
      });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const faculty = await FacultyModel.findById(decoded.id).select("-password");
    if (!faculty) {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }

    req.faculty = faculty;
    next();
  } catch (error) {
    console.log("Auth middleware error:", error);
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }
};

export default authMiddleware;
