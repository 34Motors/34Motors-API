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
import upload from "../middlewares/multer.middleware";
import { uploadCarImagesController } from "../controllers/cars/uploadCarImages.controller";
import { deleteCarImagesController } from "../controllers/cars/deleteCarImages.controller";

const carRoutes: Router = Router()


carRoutes.post("", verifyDataIsValid(createCarBody), verifyUserExists, createCarController)
carRoutes.patch("/:id/upload", upload.single("frontImage"), uploadFrontImageController)
carRoutes.post("/:id/upload", upload.array("image", 6), uploadCarImagesController)
carRoutes.delete("/:imageId/images/delete", deleteCarImagesController)
carRoutes.get("", listAllCarController)
carRoutes.get("/:id", listCarController)
carRoutes.patch("/:id", verifyDataIsValid(carEditSchema), editCarController)
carRoutes.delete("/:id", deleteCarController)

export { carRoutes }