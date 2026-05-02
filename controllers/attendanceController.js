import AttendanceModel from "../models/attendance.js";

const getTodayRange = () => {
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const endOfToday = new Date();
  endOfToday.setHours(23, 59, 59, 999);

  return { startOfToday, endOfToday };
};

export const getTodayAttendance = async (req, res) => {
  try {
    const faculty = req.faculty;

    if (!faculty) {
      return res.status(401).json({
        success: false,
        message: "Faculty Required",
      });
    }

    const { startOfToday, endOfToday } = getTodayRange();

    const todayAttendanceStats = await AttendanceModel.find({
      facultyId: faculty.grId,
      attendanceDate: {
        $gte: startOfToday,
        $lte: endOfToday,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Today Attendance Fetched",
      data: todayAttendanceStats,
    });
  } catch (error) {
    console.log("get today attendance error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const markTodayAttendance = async (req, res) => {
  try {
    const faculty = req.faculty;

    if (!faculty) {
      return res.status(401).json({
        success: false,
        message: "Faculty Required To Mark Attendance",
      });
    }

    const { startOfToday, endOfToday } = getTodayRange();

    const attendanceStat = await AttendanceModel.findOne({
      facultyId: faculty.grId,
      attendanceDate: {
        $gte: startOfToday,
        $lte: endOfToday,
      },
    });

    if (attendanceStat) {
      return res.status(400).json({
        success: false,
        message: "Cannot Mark Attendance More Than One Time",
      });
    }

    const facultyStats = await AttendanceModel.create({
      facultyId: faculty.grId,
      isPresent: true,
      attendanceDate: new Date(),
    });

    return res.status(201).json({
      success: true,
      message: "Today's Attendance Marked Successfully",
      data: facultyStats,
    });
  } catch (error) {
    console.log("mark today attendance error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const getAttendanceByDate = async (req, res) => {
  try {
    const faculty = req.faculty;
    const { date } = req.query;

    if (!faculty) {
      return res.status(401).json({
        success: false,
        message: "Faculty Required",
      });
    }

    if (!date) {
      return res.status(400).json({
        success: false,
        message: "Query param 'date' is required in YYYY-MM-DD format",
      });
    }

    const inputDate = new Date(date);
    if (Number.isNaN(inputDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid date format. Use YYYY-MM-DD",
      });
    }

    const startOfDate = new Date(inputDate);
    startOfDate.setHours(0, 0, 0, 0);

    const endOfDate = new Date(inputDate);
    endOfDate.setHours(23, 59, 59, 999);

    const attendanceData = await AttendanceModel.find({
      facultyId: faculty.grId,
      attendanceDate: {
        $gte: startOfDate,
        $lte: endOfDate,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Attendance By Date Fetched",
      data: attendanceData,
    });
  } catch (error) {
    console.log("get attendance by date error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
