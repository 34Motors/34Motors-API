import { Router } from "express";
import verifyDataIsValid from "../middlewares/verifyDataIsValid.middleware";
import {
  carEditSchema,
  createCarBody,
  uploadFrontImageRequest,
} from "../schemas/cars.schema";
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
import verifyIsAuth from "../middlewares/verifyIsAuth.middleware";
import { listCarImagesController } from "../controllers/cars/listCarImages.controller";
import { verifyCarExists } from "../middlewares/verifyCarExists.middleware";
import { listCarsFromSellerController } from "../controllers/cars/listCarsFromSeller.controller";
import { verifyUserIdForParamsExist } from "../middlewares/verifyUserIdForParams.middleware";

const carRoutes: Router = Router();

carRoutes.post(
  "",
  verifyIsAuth,
  verifyDataIsValid(createCarBody),
  verifyUserExists,
  createCarController
);

carRoutes.patch(
  "/:id/upload",
  verifyIsAuth,
  verifyCarExists,
  upload.single("frontImage"),
  uploadFrontImageController
);

carRoutes.post(
  "/:id/upload",
  verifyIsAuth,
  upload.array("image", 6),
  uploadCarImagesController
);

carRoutes.get(
  "/:id/images",
  verifyCarExists,
  verifyIsAuth,
  listCarImagesController
);

carRoutes.delete(
  "/:imageId/images/delete",
  verifyIsAuth,
  deleteCarImagesController
);

carRoutes.get("/:id", listCarController);

carRoutes.get(
  "/seller/:id",
  verifyUserIdForParamsExist,
  listCarsFromSellerController
);

carRoutes.get("", listAllCarController);

carRoutes.patch(
  "/:id",
  verifyIsAuth,
  verifyDataIsValid(carEditSchema),
  editCarController
);

carRoutes.delete("/:id", verifyIsAuth, deleteCarController);

export { carRoutes };
