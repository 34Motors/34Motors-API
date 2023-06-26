import { Router } from "express";
import verifyDataIsValid from "../middlewares/verifyDataIsValid.middleware";
import { createCommentBody } from "../schemas/comments.schema";
import { createCommentController } from "../controllers/comments/createComment.controller";
import verifyIsAuth from "../middlewares/verifyIsAuth.middleware";

const commentRoutes: Router = Router();

commentRoutes.post("/:carId",verifyIsAuth, verifyDataIsValid(createCommentBody),  createCommentController)

export { commentRoutes };
