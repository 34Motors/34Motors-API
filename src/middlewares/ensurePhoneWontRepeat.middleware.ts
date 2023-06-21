import { NextFunction, Request, Response } from "express";
import { prismaClient } from "../database/index";
import { AppError } from "../errors";
import { User } from "@prisma/client";

const ensurePhoneWontRepeat = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const phoneExists: User | null = await prismaClient.user.findUnique({
    where: {
      phone: req.body.phone,
    },
  });

  if (phoneExists) {
    throw new AppError("O telefone informado já foi cadastrado", 409);
  }

  next();
};

export { ensurePhoneWontRepeat };
