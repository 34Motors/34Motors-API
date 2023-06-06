import { prismaClient } from "../../database";
import { ICarsBody } from "../../interfaces/cars.interfaces";

const createCarsService = async (data: ICarsBody) => {

    const newCar = await prismaClient.car.create({

        data: {
            brand: data.brand,
            model: data.model,
            year: data.year,
            fuelType: data.fuelType,
            quilometers: data.quilometers,
            color: data.color,
            fipePrice: data.fipePrice,
            price: data.price,
            description: data.description,
            frontImage: data.frontImage,
            published: data.published,
            userId: data.userId,
        },
        include: {
            images: true,
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
                }
            },
            comments: true,
        }
    })
    data.images.map(async (image) => {

        await prismaClient.image.create({
            data: {
                imageUrl: image,
                carId: newCar.id
            }
        })
    })

    return newCar

}

export { createCarsService }