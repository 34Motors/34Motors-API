import { Request, Response } from "express";

const uploadCarImagesController = async (req: Request, res: Response): Promise<Response> => {
    return res.json({message: "funfando"})
}