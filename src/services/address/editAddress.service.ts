import { prismaClient } from "../../database";
import { AppError } from "../../errors";
import { IAddressEdit } from "../../interfaces/address.interface";

const editAddressService = async (data: IAddressEdit, id: number) => {
  const address = await prismaClient.address.update({
    where: {
      userId: id,
    },
    data: data as any,
  });

  return address;
};

export { editAddressService };
