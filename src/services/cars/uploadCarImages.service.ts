import { v2 as cloudinary } from "cloudinary";
import { prismaClient } from "../../database";
import { unlink } from "fs";

const uploadCarImagesService = async (
  image: Express.Multer.File,
  carId: number
) => {
    const uploadImage = await cloudinary.uploader.upload(
    image.path,
    { resource_type: "image" },
    (error: any, result: any) => {
      return result;
    }
  );

  await prismaClient.image.create({
    data: {
      imageUrl: uploadImage.secure_url,
      carId: carId,
    },
  });

  unlink(image.path, (error) => {
    if(error) {
      console.log(error)
    }
  })
};

export { uploadCarImagesService };
