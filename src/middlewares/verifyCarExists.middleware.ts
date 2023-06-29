import { NextFunction, Request, Response } from "express";
import { prismaClient } from "../database";
import { AppError } from "../errors";

const verifyCarExists = async (
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const id: number = Number(req.params.id);

  const car = await prismaClient.car.findUnique({
    where: { id },
  });

  if (!car) throw new AppError("Carro não encontrado", 404);

  return next();
};

export { verifyCarExists };
