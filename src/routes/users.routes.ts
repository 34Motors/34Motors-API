import { Router } from "express";
import { createUserController } from "../controllers/users/createUser.controller";
import verifyDataIsValid from "../middlewares/verifyDataIsValid.middleware";
import {
  addressEditSchema,
  createUserBody,
  userEditSchema,
} from "../schemas/users.schema";
import { listUserController } from "../controllers/users/listUser.controller";
import { verifyUserExists } from "../middlewares/verifyUserExists.middleware";
import { editUserController } from "../controllers/users/editUser.controller";
import verifyIsAuth from "../middlewares/verifyIsAuth.middleware";
import { editAddressController } from "../controllers/address/editAddress.controller";
import { verifyUserIdForParamsExist } from "../middlewares/verifyUserIdForParams.middleware";
import { verifyIsEmpty } from "../middlewares/verifyIsEmpty.middleware";

const userRoutes: Router = Router();

userRoutes.post("", verifyDataIsValid(createUserBody), createUserController);
userRoutes.get("/:id", listUserController);
userRoutes.patch(
  "/:id",
  verifyUserIdForParamsExist,
  verifyIsAuth,
  verifyIsEmpty,
  verifyDataIsValid(userEditSchema),
  editUserController
);
userRoutes.patch(
  "/:id/address",
  verifyUserIdForParamsExist,
  verifyIsEmpty,
  verifyIsAuth,
  verifyDataIsValid(addressEditSchema),
  editAddressController
);

export { userRoutes };
