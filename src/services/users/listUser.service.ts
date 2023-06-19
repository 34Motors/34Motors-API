import { prismaClient } from "../../database"
import { AppError } from "../../errors"

const listUserService = async (id: number) => {

    const user = await prismaClient.user.findUnique({
        where: { id },
        select:{
            id: true,
            name: true,
            email: true,
            birthDate: true,
            phone: true,
            isSeller: true,
            description: true,
            cpf: true,
        }
    })
    
    if (!user) throw new AppError("user not found", 404)

    return user
}

export { listUserService }