import express from "express";
import cors from "cors";
import { env } from "./config/env.js";
import connectDatabase from "./config/database.js";
import router from "./routes/index.js";

const app = express();

app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connectDatabase();

app.use("/api", router);

const errorHandler = (err, req, res, next) => {
  const errStatus = err.statusCode || 500;
  const errMsg = err.message || "Something went wrong";
  res.status(errStatus).json({
    success: false,
    message: errMsg,
    data: err,
    stack: process.env.NODE_ENV === "development" ? err.stack : {},
  });
};

app.use(errorHandler);

app.listen(env.port, () => {
  console.log(`Listening on port ${env.port}`);
});
