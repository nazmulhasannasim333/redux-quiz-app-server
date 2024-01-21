import { Router } from "express";
import { quiz } from "../controllers/quiz.js";
const quizRouter = Router();

quizRouter
  .route("/:id")
  .get(quiz.getQuiz)
  .patch(quiz.updateQuiz)
  .delete(quiz.deleteQuiz);
quizRouter.route("/").get(quiz.getQuizzes).post(quiz.createQuiz);

export default quizRouter;
