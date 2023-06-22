import { NextFunction, Request, Response } from "express";
import { prismaClient } from "../database/index";
import { AppError } from "../errors";
import { User } from "@prisma/client";

const ensureCpfWontRepeat = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const cpfExists: User | null = await prismaClient.user.findUnique({
    where: {
      cpf: req.body.cpf,
    },
  });

  if (cpfExists) {
    throw new AppError("O CPF informado já foi cadastrado", 409);
  }

  next();
};

export { ensureCpfWontRepeat };
