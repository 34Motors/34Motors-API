import { NextFunction, Request, Response } from 'express'
import { prismaClient } from '../database';
import { AppError } from '../errors';

const verifyUserIsOwnerMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    const comment = await prismaClient.comment.findUnique({
        where: {
            id: +req.params.commentId,
        },
    });
    
    if (!comment) throw new AppError("Comentário não encontrado!", 404);

    if(res.locals.userId != comment.userId) throw new AppError("você não é o dono deste comentário!", 403)

    return next();
}
export { verifyUserIsOwnerMiddleware }