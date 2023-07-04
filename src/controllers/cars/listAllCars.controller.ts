import { Request, Response } from 'express'
import { listAllCarService } from '../../services/cars/listAllCars.service'

const listAllCarController = async (req: Request, res: Response): Promise<Response> => {
    const cars = await listAllCarService(req.query)

    return res.status(200).json(cars)
}

export { listAllCarController }