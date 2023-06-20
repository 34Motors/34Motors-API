import { Request, Response } from "express";
import { deleteUserService } from "../../services/users/deleteUser.service";

const deleteUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  await deleteUserService(Number(res.locals.userId));

  return res.status(204).json();
};

export { deleteUserController };
