import { NextFunction, Request, Response } from "express"
import { prismaClient } from "../database"
import { AppError } from "../errors"

const verifyUserExists = async (req: Request, _res: Response, next: NextFunction): Promise<Response | void> => {
    const id: number = parseInt(req.body.userId)

    const userExists = await prismaClient.user.findUnique({
        where: { id }
    })

    if (!userExists) throw new AppError("user not found", 404)

    return next()

}
export { verifyUserExists }