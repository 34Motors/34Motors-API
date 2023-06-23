import { Request, Response } from "express";
import { createUserService } from "../../services/users/createUser.service";
import { recoverPasswordService } from "../../services/users/recoverPassword.service";

const recoverPasswordController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { password } = req.body;
  const { token } = req.params;

  await recoverPasswordService(password, token);

  return res.status(201).json({ message: "Senha alterada com sucesso" });
};

export { recoverPasswordController };
