import { Router } from "express";
import verifyDataIsValid from "../middlewares/verifyDataIsValid.middleware";
import { createCarBody } from "../schemas/cars.schema";
import { createCarController } from "../controllers/cars/createCar.controller";
import { verifyUserExists } from "../middlewares/verifyUserExists.middleware";
import { listCarController } from "../controllers/cars/listCar.controller";

const carRoutes: Router = Router()


carRoutes.post("", verifyDataIsValid(createCarBody), verifyUserExists, createCarController)
carRoutes.get("/:id", listCarController)

export { carRoutes }