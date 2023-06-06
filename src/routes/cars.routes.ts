import { Router } from "express";
import verifyDataIsValid from "../middlewares/verifyDataIsValid.middleware";
import { createCarBody } from "../schemas/cars.schema";
import { createCarController } from "../controllers/cars/createCar.controller";
import { verifyUserExists } from "../middlewares/verifyUserExists.middleware";

const carRoutes: Router = Router()


carRoutes.post("", verifyDataIsValid(createCarBody), verifyUserExists, createCarController)

export { carRoutes }