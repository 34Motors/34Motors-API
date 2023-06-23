import { NextFunction, Request, Response } from "express";
import { prismaClient } from "../database/index";
import { AppError } from "../errors";
import { User } from "@prisma/client";

const ensureEmailWontRepeat = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const emailExists: User | null = await prismaClient.user.findUnique({
    where: {
      email: req.body.email,
    },
  });

  if (emailExists) {
    throw new AppError("O e-mail já foi cadastrado", 409);
  }

  next();
};

export { ensureEmailWontRepeat };
