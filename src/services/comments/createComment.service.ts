import { prismaClient } from "../../database"
import { AppError } from "../../errors"
import { ICommentBody } from "../../interfaces/comment.interfaces"

const createCommentService = async (data: ICommentBody, userId: number, carId: number) => {


    const userExists = await prismaClient.user.findUnique({
        where: { id: userId }
    })

    if (!userExists) throw new AppError("user not found", 404)

    const carExists = await prismaClient.car.findUnique({
        where: { id: carId }
    })

    if (!carExists) throw new AppError("car not found", 404)

    const newComment = await prismaClient.comment.create({
        data: {
            description: data.description,
            userId,
            carId
        },
        select: {
            description: true,
            postDate: true,
            user: {
                select:{
                    id: true,
                    name: true,
                }
            }
        }
    })

return newComment

}

export { createCommentService }