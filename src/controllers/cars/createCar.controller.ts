import { Request, Response } from 'express'
import { createCarsService } from '../../services/cars/createCar.service'

const createCarController = async (req: Request, res: Response): Promise<Response> => {

    const car = await createCarsService(req.body)

    return res.status(201).json(car)
}

export { createCarController }