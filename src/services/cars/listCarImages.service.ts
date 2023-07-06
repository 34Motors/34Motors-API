import { prismaClient } from "../../database";

const listCarImagesService = async (id: number) => {
  const images = await prismaClient.image.findMany({
    where: {
      carId: id,
    },
  });

  return images;
};

export { listCarImagesService };
