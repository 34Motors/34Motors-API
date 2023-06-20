import { prismaClient } from "../../database";
import { AppError } from "../../errors";
import { IUserEdit } from "../../interfaces/users.interfaces";
import { userEditSchema } from "../../schemas/users.schema";

const editUserService = async (data: IUserEdit, id: number) => {
  const isEmpty = Object.keys(data).length <= 0;
  
  if (isEmpty) {
    throw new AppError("Your request body is empty", 400);
  }

  const user = await prismaClient.user.update({
    where: {
      id: id,
    },
    data: data as any,
  });

  return user;
};

export { editUserService };
