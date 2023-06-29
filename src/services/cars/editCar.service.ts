import { prismaClient } from "../../database"
import { AppError } from "../../errors"
import { ICarsEditedBody } from "../../interfaces/cars.interfaces"

const editCarService = async (data: ICarsEditedBody, id: number) => {

    const carExists = await prismaClient.car.findUnique({
        where: { id }
    })

    if (!carExists) throw new AppError("Carro não encontrado", 404)

    const carUpdateData = {
        ...carExists,
        ...data
    }

    const editCar = await prismaClient.car.update({
        where: { id },
        data: {
            year: carUpdateData.year!,
            brand: carUpdateData.brand!,
            color: carUpdateData.color!,
            description: carUpdateData.description!,
            fipePrice: carUpdateData.fipePrice!,
            fuelType: carUpdateData.fuelType!,
            quilometers: carUpdateData.quilometers!,
            model: carUpdateData.model!,
            price: carUpdateData.price!,
            published: carUpdateData.published!,
        }
    })

    return editCar
}

export { editCarService }
