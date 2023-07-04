import { NextFunction, Request, Response } from "express";
import { prismaClient } from "../database";
import { AppError } from "../errors";

const verifyIsEmpty = async (
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const isEmpty = Object.keys(req.body).length <= 0;

  if (isEmpty) {
    throw new AppError("Envie um objeto válido", 400);
  }

  return next();
};
export { verifyIsEmpty };
