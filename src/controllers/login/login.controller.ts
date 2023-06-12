import { Request, Response } from "express";
import { tLoginRequest } from "../../interfaces/login.interfaces";
import { createTokenService } from "../../services/login/createToken.service";

const createLoginController = async (req: Request,res: Response): Promise<Response> => {
  const loginData: tLoginRequest = req.body;

  const token: string = await createTokenService(loginData);

  return res.json({ token: token });
};

export { createLoginController };
