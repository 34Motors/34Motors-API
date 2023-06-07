import { Request, Response } from 'express'
import { editCarService } from '../../services/cars/editCar.service'

const editCarController = async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id)

    const carEdited = await editCarService(req.body, id)

    return res.status(200).json(carEdited)
}

export { editCarController }