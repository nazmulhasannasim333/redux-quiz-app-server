import QueryBuilder from "mongoose-dynamic-querybuilder";
import Module from "../models/Module.js";
import Quiz from "../models/Quiz.js";

const getModules = async (req, res, next) => {
  try {
    const moduleQuery = new QueryBuilder(Module.find({}), req.query);

    const [data, totalData] = await Promise.all([
      moduleQuery
        .filter()
        .search(["title", "status", "mark"])
        .sort()
        .paginate()
        .fields().modelQuery,
      moduleQuery.countTotal(),
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
      message: "Modules getting successfully",
      meta,
      data,
    });
  } catch (error) {
    next(error);
  }
};

const getModule = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) throw new Error("Invalid ID");

    const data = await Module.findById(id);

    res.status(200).send({
      success: true,
      message: "Module getting successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};

const createModule = async (req, res, next) => {
  try {
    const data = await Module.create(req.body);

    res.status(200).send({
      success: true,
      message: "Module created successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};

const updateModule = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) throw new Error("Invalid ID");

    // status mark

    const data = await Module.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).send({
      success: true,
      message: "Module updated successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};

const deleteModule = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) throw new Error("Invalid ID");

    const data = await Module.findByIdAndDelete(id);

    res.status(200).send({
      success: true,
      message: "Module deleted successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const module = {
  getModules,
  getModule,
  createModule,
  updateModule,
  deleteModule,
};
