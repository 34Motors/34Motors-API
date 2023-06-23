import { Request, Response } from "express";
import { listUserService } from "../../services/users/listUser.service";

const listLoggedUserController = async (req: Request, res: Response): Promise<Response> => {
  const user = await listUserService(+res.locals.userId);

  return res.status(200).json(user);
};

export { listLoggedUserController };