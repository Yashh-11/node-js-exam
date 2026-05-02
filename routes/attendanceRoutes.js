import express from "express";
import authMiddleware from "../middleware/auth.js";
import {
  getAttendanceByDate,
  getTodayAttendance,
  markTodayAttendance,
} from "../controllers/attendanceController.js";

const attendanceRouter = express.Router();

attendanceRouter.post("/mark-today", authMiddleware, markTodayAttendance);
attendanceRouter.get("/today", authMiddleware, getTodayAttendance);
attendanceRouter.get("/by-date", authMiddleware, getAttendanceByDate);

export default attendanceRouter;
