import { Request, Response } from "express";
import { listCarsFromSellerService } from "../../services/cars/listCarsFromSeller.service";

const listCarsFromSellerController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id = parseInt(req.params.id);

  const cars = await listCarsFromSellerService(id);

  return res.status(200).json(cars);
};

export { listCarsFromSellerController };
