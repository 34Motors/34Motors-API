import { Request, Response } from 'express'
import { createCommentService } from '../../services/comments/createComment.service'

const createCommentController = async (req: Request, res: Response): Promise<Response> => {

    const newComment = await createCommentService(req.body, +res.locals.userId, +req.params.carId)

    return res.status(200).json(newComment)
}

export { createCommentController }