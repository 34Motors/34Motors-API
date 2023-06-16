import { Router } from "express";
import verifyDataIsValid from "../middlewares/verifyDataIsValid.middleware";
import { carEditSchema, createCarBody, uploadFrontImageRequest } from "../schemas/cars.schema";
import { createCarController } from "../controllers/cars/createCar.controller";
import { verifyUserExists } from "../middlewares/verifyUserExists.middleware";
import { listCarController } from "../controllers/cars/listCar.controller";
import { editCarController } from "../controllers/cars/editCar.controller";
import { listAllCarController } from "../controllers/cars/listAllCars.controller";
import { deleteCarController } from "../controllers/cars/deleteCar.controller";
import { uploadFrontImageController } from "../controllers/cars/uploadFrontImage.controller";
import upload from "../middlewares/multer";

const carRoutes: Router = Router()


carRoutes.post("", verifyDataIsValid(createCarBody), verifyUserExists, createCarController)
carRoutes.patch("/:id/upload", upload.single("frontImage"), uploadFrontImageController)
carRoutes.get("/:id", listCarController)
carRoutes.get("", listAllCarController)
carRoutes.patch("/:id", verifyDataIsValid(carEditSchema), editCarController)
carRoutes.delete("/:id", deleteCarController)

export { carRoutes }