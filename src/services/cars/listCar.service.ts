import { prismaClient } from "../../database"
import { AppError } from "../../errors"

const listCarService = async (id: number) => {

    const carExists = await prismaClient.car.findUnique({
        where:{ id }
    })

    if(!carExists) throw new AppError("car not found", 404)

    const car = await prismaClient.car.findUnique({
        where: { id },
        include: {
            user: true,
            comments: true,
            images: true,
        }
    })

    return car
}

export { listCarService }