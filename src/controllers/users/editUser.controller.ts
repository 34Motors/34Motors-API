import { Request, Response } from "express";
import { editUserService } from "../../services/users/editUser.service";

const editUserController = async (req: Request, res: Response) => {
  const { body, params } = req;
  const data = await editUserService(body, Number(params.id));
  return res.status(201).json(data);
};

export { editUserController };
