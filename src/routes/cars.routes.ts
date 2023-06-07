import { Router } from "express";
import verifyDataIsValid from "../middlewares/verifyDataIsValid.middleware";
import { carEditSchema, createCarBody } from "../schemas/cars.schema";
import { createCarController } from "../controllers/cars/createCar.controller";
import { verifyUserExists } from "../middlewares/verifyUserExists.middleware";
import { listCarController } from "../controllers/cars/listCar.controller";
import { editCarController } from "../controllers/cars/editCar.controller";
import { listAllCarController } from "../controllers/cars/listAllCars.controller";

const carRoutes: Router = Router()


carRoutes.post("", verifyDataIsValid(createCarBody), verifyUserExists, createCarController)
carRoutes.get("/:id", listCarController)
carRoutes.get("", listAllCarController)
carRoutes.patch("/:id", verifyDataIsValid(carEditSchema), editCarController)

export { carRoutes }