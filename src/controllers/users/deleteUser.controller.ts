import { Request, Response } from "express";
import { deleteUserService } from "../../services/users/deleteUser.service";

const deleteUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const passwordData = req.body;

  await deleteUserService(Number(res.locals.userId), passwordData.password);

  return res.status(204).json();
};

export { deleteUserController };
