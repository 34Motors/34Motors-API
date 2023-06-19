import { Request, Response } from "express";
import { deleteCarImagesService } from "../../services/cars/deleteCarImages.service";
import { AppError } from "../../errors";

const deleteCarImagesController = async (req: Request, res: Response): Promise<Response> => {
  await deleteCarImagesService(parseInt(req.params.imageId));

  return res.status(204).send();
};

export { deleteCarImagesController };
