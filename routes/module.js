import { Router } from "express";
import { module } from "../controllers/module.js";
const moduleRouter = Router();

moduleRouter
  .route("/:id")
  .get(module.getModule)
  .patch(module.updateModule)
  .delete(module.deleteModule);
moduleRouter.route("/").get(module.getModules).post(module.createModule);

export default moduleRouter;
