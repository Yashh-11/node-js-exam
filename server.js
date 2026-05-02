import express from "express";
import { dbConnect } from "./configs/db.js";
import facultyRouter from "./routes/facultyRoutes.js";
import attendanceRouter from "./routes/attendanceRoutes.js";

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Employee/Faculty Attendance API is running",
  });
});

app.use("/api/faculty", facultyRouter);
app.use("/api/attendance", attendanceRouter);

const startServer = async () => {
  await dbConnect();
  app.listen(PORT, () => {
    console.log(`Server running on port : http://localhost:${PORT}`);
  });
};

startServer();
