import { prismaClient } from "../../database";
import { ICarsBody } from "../../interfaces/cars.interfaces";

const createCarsService = async (data: ICarsBody, userId: number) => {
  const numberFipePrice = data.fipePrice.split(",")[0].replace(/[^0-9]+/g, "");

  const newCar = await prismaClient.car.create({
    data: {
      brand: data.brand,
      model: data.model,
      year: data.year,
      fuelType: data.fuelType,
      quilometers: data.quilometers,
      color: data.color,
      fipePrice: numberFipePrice,
      price: data.price,
      description: data.description,
      frontImage: "",
      published: true,
      userId: +userId,
    },
  });

  const returnCar = await prismaClient.car.findFirst({
    where: {
      id: newCar.id,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          birthDate: true,
          phone: true,
          isSeller: true,
          description: true,
          cpf: true,
        },
      },
      comments: true,
      images: true,
    },
  });

  return returnCar;
};

export { createCarsService };
