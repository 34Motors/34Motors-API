import { NextFunction, Request, Response } from "express";
import { prismaClient } from "../database";
import { AppError } from "../errors";

const verifyUserIdForParamsExist = async (
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const id: number = Number(req.params.id);

  const userExists = await prismaClient.user.findUnique({
    where: { id },
  });

  if (!userExists) throw new AppError("User not found", 404);

  return next();
};
export { verifyUserIdForParamsExist };
