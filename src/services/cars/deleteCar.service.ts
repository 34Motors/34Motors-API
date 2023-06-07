import { prismaClient } from "../../database"
import { AppError } from "../../errors"

const deleteCarService = async (id: number) => {

    const car = await prismaClient.car.findUnique({
        where: { id }
    })

    if (!car) throw new AppError("car not found", 404)

    await prismaClient.comment.deleteMany({
        where: { carId: car.id }
    })

    await prismaClient.image.deleteMany({
        where: { carId: car.id }
    })

    await prismaClient.car.delete({
        where: { id }
    })

    return
}

export { deleteCarService }