import { prismaClient } from "../../database";
import { AppError } from "../../errors";
import { IUserEdit } from "../../interfaces/users.interfaces";
import { userEditSchema } from "../../schemas/users.schema";

const editUserService = async (data: IUserEdit, id: number) => {
  const user = await prismaClient.user.update({
    where: {
      id: id,
    },
    data: data as any,
  });

  return user;
};

export { editUserService };
