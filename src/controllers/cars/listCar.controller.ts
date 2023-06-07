import { Request, Response } from 'express'
import { listCarService } from '../../services/cars/listCar.service'

const listCarController = async (req: Request, res: Response): Promise<Response> => {

    const id = parseInt(req.params.id)

    const car = await listCarService(id)

    return res.status(200).json(car)
}

export { listCarController }