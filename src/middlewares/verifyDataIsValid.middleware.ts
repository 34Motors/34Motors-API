import { NextFunction, Request, Response } from "express"
import { ZodTypeAny } from "zod"

const verifyDataIsValid = (schema: ZodTypeAny) => (req: Request, _res: Response, next: NextFunction): Response | void => {

    const validatedData = schema.parse(req.body)

    req.body = validatedData

    return next()
}

export default verifyDataIsValid