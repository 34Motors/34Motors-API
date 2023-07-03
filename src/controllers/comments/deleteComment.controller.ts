import { Request, Response } from "express";
import { deleteUserService } from "../../services/users/deleteUser.service";
import { deleteCommentService } from "../../services/comments/deleteComment.service";

const deleteCommentController = async (
  req: Request,
  res: Response
): Promise<Response> => {

  await deleteCommentService(Number(req.params.commentId));

  return res.status(204).send();
};

export { deleteCommentController };
