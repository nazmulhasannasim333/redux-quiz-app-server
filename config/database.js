import mongoose from "mongoose";
import { env } from "./env.js";

const connectDatabase = async () => {
  try {
    await mongoose.connect(env.database_url);
  } catch (error) {
    console.error(error);
  }
};

export default connectDatabase;
