import { Request, Response } from "express";
import { editAddressService } from "../../services/address/editAddress.service";

const editAddressController = async (req: Request, res: Response) => {
  const payload = req.body;
  const data = await editAddressService(payload, Number(req.params.id));
  return res.status(200).json(data);
};

export { editAddressController };
