import { prismaClient } from "../../database/index";

const deleteUserService = async (id: number) => {
  try {
    const user = await prismaClient.user.findUnique({
      where: { id },
      select: { address: true },
    });
    const addressId = Number(user?.address?.id);

    await prismaClient.address.delete({
      where: { id: addressId },
    });

    await prismaClient.user.delete({
      where: { id },
    });
  } catch (error) {
    console.log(error);
  }
};

export { deleteUserService };
