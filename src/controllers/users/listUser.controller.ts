import { Request, Response } from 'express'
import { createUserService } from '../../services/users/createUser.service'
import { listUserService } from '../../services/users/listUser.service'


const listUserController = async (req: Request, res: Response): Promise<Response> => {
    const user = await listUserService(+req.params.id)

    return res.status(201).json(user)
}

export { listUserController }