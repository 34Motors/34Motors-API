import { prismaClient } from "../../database";
import { AppError } from "../../errors";
import { IUserEdit } from "../../interfaces/users.interfaces";
import { userEditSchema } from "../../schemas/users.schema";

const editUserService = async (data: IUserEdit, id: number) => {
  const isEmpty = Object.keys(data).length <= 0;
  
  const userExists = await prismaClient.user.findUnique({
      where: { id }
  })

  if (isEmpty) {
    throw new AppError("Your request body is empty", 400);
  }

  if (!userExists) throw new AppError("User not found", 404)
  

  const user = await prismaClient.user.update({
    where: {
      id: id,
    },
    data: data as any,
  });

  return user;
};

export { editUserService };
