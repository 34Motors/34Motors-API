import { Request, Response } from "express";
import { getCommentsService } from "../../services/comments/getComments.service";

const getCommentsController = async (req: Request, res: Response): Promise<Response> => {
    const comments = await getCommentsService(parseInt(req.params.carId))

    return res.json(comments)
}

export {getCommentsController}