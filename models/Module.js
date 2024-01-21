import { Schema, model } from "mongoose";

const moduleSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    status: {
      type: Boolean,
      required: true,
      default: false,
    },
    mark: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

const Module = model("Module", moduleSchema);
export default Module;
