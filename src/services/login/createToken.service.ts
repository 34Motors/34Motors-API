import { tLoginRequest } from "../../interfaces/login.interfaces";
import { prismaClient } from "../../database/index";
import "dotenv/config";
import { AppError } from "../../errors";
import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";

const createTokenService = async ({
  email,
  password,
}: tLoginRequest): Promise<string> => {
  const findUser = await prismaClient.user.findFirst({ where: { email } });

  if (!findUser) {
    throw new AppError("Invalid credentials", 403);
  }

  const passwordMatch: boolean = await compare(password, findUser.password);

  if (!passwordMatch) {
    throw new AppError("Invalid credentials", 403);
  }

  const token = jwt.sign({ email: findUser.email }, process.env.SECRET_KEY!, {
    expiresIn: "24h",
    subject: String(findUser.id),
  });

  return token;
};

export { createTokenService };