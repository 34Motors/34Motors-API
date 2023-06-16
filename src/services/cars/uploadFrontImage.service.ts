import { v2 as cloudinary } from "cloudinary";
import { prismaClient } from "../../database";
/*
const uploadImagesArray = (id: number, images: Express.Multer.File[]) => {
  images.map(async (image: Express.Multer.File) => {
    const uploadImage = await cloudinary.uploader.upload(
      image.path,
      { resource_type: "image" },
      (error: any, result: any) => {
        console.log(error);
        return result;
      }
    );

    await prismaClient.image.create({
      data: {
        imageUrl: uploadImage.secure_url,
        carId: id,
      },
    });
  });
};

const uploadCoverImage = async (image: Express.Multer.File) => {
  console.log(image);
  const uploadImage = await cloudinary.uploader.upload(
    image.path,
    { resource_type: "image" },
    (error: any, result: any) => {
      console.log(error);
      return result;
    }
  );

  return uploadImage;
};


const uploadImagesService = async (data: IUploadCarImages, carId: number) => {
  const { frontImage } = data;
  const frontImageUploaded = await uploadCoverImage(frontImage as Express.Multer.File);

  //uploadImagesArray(carId, images);

  await prismaClient.car.update({
    where: { id: carId },
    data: {
      frontImage: frontImageUploaded.secure_url,
    },
  });

  return;
};
*/

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

  return;
};

export { uploadFrontImageService };
