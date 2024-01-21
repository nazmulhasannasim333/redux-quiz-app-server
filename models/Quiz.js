import { Schema, model } from "mongoose";

const quizSchema = new Schema(
  {
    module: {
      type: Schema.Types.ObjectId,
      ref: "Module",
      required: true,
    },
    question: { type: String, required: true },
    description: { type: String, required: true },
    options: { type: [String], required: true, default: undefined },
    correctOption: { type: String, required: true },
  },
  { timestamps: true }
);

const Quiz = model("Quiz", quizSchema);
export default Quiz;
