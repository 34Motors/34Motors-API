import { prismaClient } from "../../database";

const listCarsFromSellerService = async (sellerId: number) => {
  const cars = await prismaClient.car.findMany({
    where: { userId: sellerId },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  return cars;
};

export { listCarsFromSellerService };
