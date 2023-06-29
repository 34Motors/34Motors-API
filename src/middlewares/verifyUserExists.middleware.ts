import { NextFunction, Request, Response } from "express";
import { prismaClient } from "../database";
import { AppError } from "../errors";

const verifyUserExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const id: number = parseInt(res.locals.userId);

  const userExists = await prismaClient.user.findUnique({
    where: { id },
  });

  if (!userExists) throw new AppError("Usuário não encontrado", 404);

  return next();
};
export { verifyUserExists };
