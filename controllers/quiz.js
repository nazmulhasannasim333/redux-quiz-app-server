import QueryBuilder from "mongoose-dynamic-querybuilder";
import Quiz from "../models/Quiz.js";

const getQuizzes = async (req, res, next) => {
  try {
    const quizQuery = new QueryBuilder(Quiz.find({}), req.query);

    const [data, totalData] = await Promise.all([
      quizQuery
        .filter()
        .search(["module", "question", "description", "options", "answer"])
        .sort()
        .paginate()
        .fields().modelQuery,
      quizQuery.countTotal(),
    ]);

    const limit = Number(req.query.limit) || 10;
    const meta = {
      limit,
      page: Number(req.query.page) || 1,
      total: totalData,
      totalPage: Math.ceil(totalData / limit),
    };

    res.status(200).send({
      success: true,
      message: "Quizzes getting successfully",
      meta,
      data,
    });
  } catch (error) {
    next(error);
  }
};

const getQuiz = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) throw new Error("Invalid ID");

    const data = await Quiz.findById(id);

    res.status(200).send({
      success: true,
      message: "Quiz getting successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};

const createQuiz = async (req, res, next) => {
  try {
    const data = await Quiz.insertMany(req.body)

    res.status(200).send({
      success: true,
      message: "Quiz created successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};

const updateQuiz = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) throw new Error("Invalid ID");

    const data = await Quiz.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).send({
      success: true,
      message: "Quiz updated successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};

const deleteQuiz = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) throw new Error("Invalid ID");

    const data = await Quiz.findByIdAndDelete(id);

    res.status(200).send({
      success: true,
      message: "Quiz deleted successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const quiz = {
  getQuizzes,
  getQuiz,
  createQuiz,
  updateQuiz,
  deleteQuiz,
};
