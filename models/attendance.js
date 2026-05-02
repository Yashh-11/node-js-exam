import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    facultyId: {
      type: String,
      required: true,
      trim: true,
    },
    isPresent: {
      type: Boolean,
      default: true,
    },
    attendanceDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const AttendanceModel = mongoose.model("Attendance", attendanceSchema);
export default AttendanceModel;
