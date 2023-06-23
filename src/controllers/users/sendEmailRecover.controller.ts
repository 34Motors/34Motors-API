import { Request, Response } from "express";
import { sendEmailResetPasswordService } from "../../services/users/sendEmailResetPassword.service";

const sendEmailResetPasswordController = async (
  req: Request,
  res: Response
) => {
  const { email } = req.body;

  await sendEmailResetPasswordService(email);

  return res.json({ message: `Email de recuperação enviado para ${email}` });
};

export { sendEmailResetPasswordController };
