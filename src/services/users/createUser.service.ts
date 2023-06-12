import { prismaClient } from "../../database";
import { AppError } from "../../errors";
import { tUserRequest } from "../../interfaces/users.interfaces";

const createUserService = async (userData: tUserRequest) => {
  try {
    const newUser = await prismaClient.user.create({
        data: {
          name: userData.name,
          password: userData.password,
          email: userData.email,
          cpf: userData.cpf,
          phone: userData.phone,
          birthDate: userData.birthDate,
          description: userData.description,
          isSeller: userData.isSeller,
        },
      });
    
      await prismaClient.address.create({
        data: {
          cep: userData.cep,
          city: userData.city,
          state: userData.state,
          street: userData.street,
          number: userData.number,
          complement: userData.complement,
          userId: newUser.id,
        },
      });
    
      const returnUser = await prismaClient.user.findFirst({
        where: {
          id: newUser.id,
        },
        include: {
          adress: true,
        },
      });
    
      return returnUser;
  } catch (error) {
    throw new AppError("Try a different CPF, email or phone")
  }
};

export { createUserService };
