import { Request, Response } from "express";
import { uploadFrontImageService } from "../../services/cars/uploadFrontImage.service";
import { AppError } from "../../errors";

const uploadFrontImageController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  if (!req.file) {
    throw new AppError("Por favor, envie arquivos válidos", 400);
  }

  const validFormats = ["image/jpeg", "image/png", "image/webp"];
  if (!validFormats.includes(req.file!.mimetype)) {
    throw new AppError(`Os formatos válidos são: ${validFormats}`);
  }

  await uploadFrontImageService(req.file!, parseInt(req.params.id));

  return res.status(201).json({ message: "Imagem da capa definida com sucesso!" });
};

export { uploadFrontImageController };
