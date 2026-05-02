import { config } from "dotenv";
import mongoose from "mongoose";

config();

export async function dbConnect() {
  try {
	await mongoose.connect(process.env.DB_URI);
	console.log("db connected");
  } catch (error) {
    console.log("Error Occured in db: ", error.message);
  }
}
