import { prismaClient } from "../../database";
import { AppError } from "../../errors";

const listUserService = async (id: number) => {
  const user = await prismaClient.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      isSeller: true,
      description: true,
      cars: {
        select: {
            id: true,
            brand: true,
            model: true,
            quilometers: true,
            fipePrice: true,
            price: true,
            description: true,
            frontImage: true,
            published: true,
        }
      },
    },
  });

  if (!user) throw new AppError("Usuário não encontrado", 404);

  return user;
};

export { listUserService };
