import { Request, Response } from 'express'
import { listCarImagesService } from '../../services/cars/listCarImages.service'

const listCarImagesController = async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id)

    const images = await listCarImagesService(id)

    return res.status(200).json(images)
}

export { listCarImagesController }