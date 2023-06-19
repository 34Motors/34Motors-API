import { v2 as cloudinary } from "cloudinary";
import { prismaClient } from "../../database";
import { unlink } from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME!,
  api_key: process.env.API_KEY!,
  api_secret: process.env.API_SECRET!,
});

const uploadFrontImageService = async (
  image: Express.Multer.File,
  carId: number
) => {
  const newImage = await cloudinary.uploader
    .upload(image.path, { resource_type: "image" })
    .then((result) => result);

  await prismaClient.car.update({
    where: { id: carId },
    data: {
      frontImage: newImage.secure_url,
    },
  });

  unlink(image.path, (error) => {
    if(error) {
      console.log(error)
    }
  })

  return;
};

export { uploadFrontImageService };
