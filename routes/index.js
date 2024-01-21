import { Router } from "express";
import moduleRouter from "./module.js";
import quizRouter from "./quiz.js";
const router = Router();

router.use("/module", moduleRouter);
router.use("/quiz", quizRouter);

export default router;
