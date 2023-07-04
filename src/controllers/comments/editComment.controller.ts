import { Request, Response } from "express";
import { editCommentService } from "../../services/comments/editComment.service";

const editCommentController = async (
  req: Request,
  res: Response
): Promise<Response> => {

  const editedComment = await editCommentService(req.body, Number(req.params.commentId));

  return res.status(200).json(editedComment);
};

export { editCommentController };
