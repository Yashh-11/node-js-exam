import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import FacultyModel from "../models/faculty.js";

export const registerFaculty = async (req, res) => {
  try {
    const { grId, name, email, password } = req.body;

    if (!grId || !name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingFaculty = await FacultyModel.findOne({
      $or: [{ email }, { grId }],
    });

    if (existingFaculty) {
      return res.status(400).json({
        success: false,
        message: "Faculty with email or GR ID already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newFaculty = await FacultyModel.create({
      grId,
      name,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      success: true,
      message: "Faculty registered successfully",
      data: {
        id: newFaculty._id,
        grId: newFaculty.grId,
        name: newFaculty.name,
        email: newFaculty.email,
      },
    });
  } catch (error) {
    console.log("register faculty error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const loginFaculty = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const faculty = await FacultyModel.findOne({ email });
    if (!faculty) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, faculty.password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        id: faculty._id,
        grId: faculty.grId,
        email: faculty.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      data: {
        id: faculty._id,
        grId: faculty.grId,
        name: faculty.name,
        email: faculty.email,
      },
    });
  } catch (error) {
    console.log("faculty login error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
