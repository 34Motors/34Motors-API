import { Router } from "express";
import verifyDataIsValid from "../middlewares/verifyDataIsValid.middleware";
import { createCommentBody } from "../schemas/comments.schema";
import { createCommentController } from "../controllers/comments/createComment.controller";
import verifyIsAuth from "../middlewares/verifyIsAuth.middleware";
import { getCommentsController } from "../controllers/comments/getComments.controller";
import { deleteCommentController } from "../controllers/comments/deleteComment.controller";
import { editCommentController } from "../controllers/comments/editComment.controller";
import { verifyUserIsOwnerMiddleware } from "../middlewares/verifyUserISOwner.middleware";

const commentRoutes: Router = Router();

commentRoutes.post("/:carId",verifyIsAuth, verifyDataIsValid(createCommentBody),  createCommentController)
commentRoutes.get("/:carId", getCommentsController)
commentRoutes.delete("/:commentId",verifyIsAuth,verifyUserIsOwnerMiddleware,deleteCommentController )
commentRoutes.patch("/:commentId",verifyIsAuth,verifyUserIsOwnerMiddleware, verifyDataIsValid(createCommentBody), editCommentController)

export { commentRoutes };
