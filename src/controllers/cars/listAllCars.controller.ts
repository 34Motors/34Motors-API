import { Request, Response } from 'express'
import { listAllCarService } from '../../services/cars/listAllCars.service'

const listAllCarController = async (_req: Request, res: Response): Promise<Response> => {
    const cars = await listAllCarService(_req.query)

    return res.status(200).json(cars)
}

export { listAllCarController }