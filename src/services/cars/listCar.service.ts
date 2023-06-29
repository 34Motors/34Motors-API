import { prismaClient } from "../../database"
import { AppError } from "../../errors"

const listCarService = async (id: number) => {

    const carExists = await prismaClient.car.findUnique({
        where: { id }
    })

    if (!carExists) throw new AppError("Carro não encontrado", 404)

    const car = await prismaClient.car.findUnique({
        where: { id },
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
                }
            },
            comments: true,
            images: true,
        }
    })

    return car
}

export { listCarService }