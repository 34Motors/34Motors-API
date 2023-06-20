import { prismaClient } from "../../database";
import { AppError } from "../../errors";
import { IAddressEdit } from "../../interfaces/address.interface";

const editAddressService = async (data: IAddressEdit, id: number) => {
  const isEmpty = Object.keys(data).length <= 0;

  if (isEmpty) {
    throw new AppError("Your request body is empty", 400);
  }

  const address = await prismaClient.address.update({
    where: {
      userId: id,
    },
    data: data as any,
  });

  return address;
};

export { editAddressService };
