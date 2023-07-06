import { compare } from "bcryptjs";
import { prismaClient } from "../../database/index";
import { AppError } from "../../errors";

const deleteUserService = async (id: number, passwordData: any) => {
  const user = await prismaClient.user.findUnique({
    where: { id },
    select: { password: true, address: true },
  });

  if (!user) throw new AppError("Usuário não encontrado", 403);

  const passwordMatch: boolean = await compare(passwordData, user.password);

  if (!passwordMatch) throw new AppError("Senha inválida", 403);

  await prismaClient.user.delete({
    where: { id },
  });
};

export { deleteUserService };
''