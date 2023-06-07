import { prismaClient } from "../../database"
import { AppError } from "../../errors"

const listCarService = async (id: number) => {

    const car = await prismaClient.car.findUnique({
        where: { id },
        include: {
            user: true,
            comments: true,
            images: true,
        }
    })

    if (!car) throw new AppError("car not found", 404)

    return car
}

export { listCarService }