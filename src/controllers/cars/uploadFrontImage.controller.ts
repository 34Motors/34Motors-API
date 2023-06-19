import { Request, Response } from "express";
import { uploadFrontImageService } from "../../services/cars/uploadFrontImage.service";
import { AppError } from "../../errors";

const uploadFrontImageController = async (req: Request, res: Response): Promise<Response> => {
  if (!req.file) {
    throw new AppError("Please, submit a valid file", 400);
  }

  const validFormats = ["image/jpeg", "image/png", "image/webp"];
  if (!validFormats.includes(req.file.mimetype)) {
    throw new AppError(`Valid formats are: ${validFormats}`);
  }

  await uploadFrontImageService(req.file, parseInt(req.params.id));

  return res.status(201).json({ message: "Successfuly uploaded file!" });
};

export { uploadFrontImageController };
