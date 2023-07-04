import { hashSync } from "bcryptjs";
import { prismaClient } from "../../database";
import { AppError } from "../../errors";

const recoverPasswordService = async (password: string, resetToken: string) => {
  const user = await prismaClient.user.findFirst({
    where: {
      resetToken: resetToken,
    },
  });

  if (!user) {
    throw new AppError("Token de redefinição de senha não encontrado", 404);
  }

  await prismaClient.user.update({
    where: {
      id: user.id,
    },
    data: {
      password: hashSync(password, 10),
      resetToken: null,
    },
  });
};

export { recoverPasswordService };
