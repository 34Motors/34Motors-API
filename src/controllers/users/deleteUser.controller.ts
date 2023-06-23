import { Request, Response } from "express";
import { deleteUserService } from "../../services/users/deleteUser.service";

const deleteUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const passwordData = req.headers.password;

  await deleteUserService(Number(res.locals.userId), passwordData);

  return res.status(204).json();
};

export { deleteUserController };
