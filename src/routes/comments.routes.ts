import { Router } from "express";
import verifyDataIsValid from "../middlewares/verifyDataIsValid.middleware";
import { createCommentBody } from "../schemas/comments.schema";
import { createCommentController } from "../controllers/comments/createComment.controller";
import verifyIsAuth from "../middlewares/verifyIsAuth.middleware";
import { getCommentsController } from "../controllers/comments/getComments.controller";

const commentRoutes: Router = Router();

commentRoutes.post("/:carId",verifyIsAuth, verifyDataIsValid(createCommentBody),  createCommentController)
commentRoutes.get("/:carId", getCommentsController)

export { commentRoutes };
