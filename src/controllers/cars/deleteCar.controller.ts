import { Request, Response } from 'express'
import { deleteCarService } from '../../services/cars/deleteCar.service'

const deleteCarController = async (req: Request, res: Response): Promise<Response> => {

    const id = parseInt(req.params.id)

    await deleteCarService(id)

    return res.status(204).send()
}

export { deleteCarController }