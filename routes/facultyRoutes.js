import express from "express";
import {
  loginFaculty,
  registerFaculty,
} from "../controllers/facultyController.js";

const facultyRouter = express.Router();

facultyRouter.post("/register", registerFaculty);
facultyRouter.post("/login", loginFaculty);

export default facultyRouter;
