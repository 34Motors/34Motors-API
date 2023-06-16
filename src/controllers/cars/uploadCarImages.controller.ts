import { Request, Response } from "express";
import { uploadCarImagesService } from "../../services/cars/uploadCarImages.service";
import { AppError } from "../../errors";

const uploadCarImagesController = async (req: Request, res: Response): Promise<Response> => {
  if (!req.files) {
    throw new AppError("Please, submit valid files", 400);
  }

  const files = req.files as Express.Multer.File[]

  files.forEach(async (file) => {await uploadCarImagesService(file, parseInt(req.params.id))})

  return res.json({ message: "Succefully uploaded images" });
};

export { uploadCarImagesController };
