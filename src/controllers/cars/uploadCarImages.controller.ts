import { Request, Response } from "express";
import { uploadCarImagesService } from "../../services/cars/uploadCarImages.service";
import { AppError } from "../../errors";
import { listCarImagesService } from "../../services/cars/listCarImages.service";

const uploadCarImagesController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  if (!req.files) {
    throw new AppError("Por favor, envie arquivos válidos", 400);
  }

  const files = req.files as Express.Multer.File[];

  for (const file of files) {
    const validFormats = ["image/jpeg", "image/png", "image/webp"];
    if (!validFormats.includes(file.mimetype)) {
      throw new AppError(`Os formatos válidos são: ${validFormats}`);
    }

    await uploadCarImagesService(file, parseInt(req.params.id));
  }

  const images = await listCarImagesService(+req.params.id);

  return res.json({
    message: "Imagem definida com sucesso!",
    images,
  });
};

export { uploadCarImagesController };
