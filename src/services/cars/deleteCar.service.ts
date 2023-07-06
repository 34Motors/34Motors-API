import { prismaClient } from "../../database"
import { AppError } from "../../errors"

const deleteCarService = async (id: number) => {

    const car = await prismaClient.car.findUnique({
        where: { id }
    })

    if (!car) throw new AppError("Carro não encontrado", 404)

    await prismaClient.car.delete({
        where: { id }
    })

    return
}

export { deleteCarService }