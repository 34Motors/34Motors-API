import { v2 as cloudinary } from "cloudinary";
import { prismaClient } from "../../database";

const deleteCarImagesService = async (imageId: number) => {
  await prismaClient.image.delete({
    where: { id: imageId },
  });
};

export { deleteCarImagesService };
