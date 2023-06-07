import { Request, Response } from 'express'
import { listAllCarService } from '../../services/cars/listAllCars.service'

const listAllCarController = async (_req: Request, res: Response): Promise<Response> => {

    const car = await listAllCarService()

    return res.status(200).json(car)
}

export { listAllCarController }