import { hash } from "bcryptjs";
import { prismaClient } from "../../database";
import { AppError } from "../../errors";
import { tUserRequest } from "../../interfaces/users.interfaces";

const createUserService = async (userData: tUserRequest) => {
  try {
    const hashedPassword = await hash(userData.password, 10);

    const description =
      userData.description === undefined ? null : userData.description;

    const newUser = await prismaClient.user.create({
      data: {
        name: userData.name,
        password: hashedPassword,
        email: userData.email,
        cpf: userData.cpf,
        phone: userData.phone,
        birthDate: userData.birthDate,
        description: description,
        isSeller: userData.isSeller,
      },
    });

    const complement = userData.complement === undefined ? null : userData.complement;

    await prismaClient.address.create({
      data: {
        cep: userData.cep,
        city: userData.city,
        state: userData.state,
        street: userData.street,
        number: userData.number,
        complement: complement,
        userId: newUser.id,
      },
    });

    const returnCreatedUser = await prismaClient.user.findFirst({
      where: {
        id: newUser.id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        birthDate: true,
        phone: true,
        isSeller: true,
        description: true,
        cpf: true,
        address: true,
      }
    });

    return returnCreatedUser;
  } catch (error) {
    console.log(error);
    throw new AppError("Try a different CPF, email or phone");
  }
};

export { createUserService };
