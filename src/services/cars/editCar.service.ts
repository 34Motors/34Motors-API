import { prismaClient } from "../../database"
import { AppError } from "../../errors"
import { ICarsEditedBody } from "../../interfaces/cars.interfaces"

const editCarService = async (data: ICarsEditedBody, id: number) => {

    const carExists = await prismaClient.car.findUnique({
        where: { id }
    })

    if (!carExists) throw new AppError("car not found", 404)

    const editCar = await prismaClient.car.update({
        where: { id },
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
        }
    })

    return editCar
}

export { editCarService }