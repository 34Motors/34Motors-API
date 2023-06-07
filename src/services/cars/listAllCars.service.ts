import { prismaClient } from "../../database"

const listAllCarService = async () => {

    const car = await prismaClient.car.findMany({
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

export { listAllCarService }