import { Router } from "express";
import { createUserController } from "../controllers/users/createUser.controller";
import verifyDataIsValid from "../middlewares/verifyDataIsValid.middleware";
import {
  addressEditSchema,
  createUserBody,
  userEditSchema,
} from "../schemas/users.schema";
import { listUserController } from "../controllers/users/listUser.controller";
import { editUserController } from "../controllers/users/editUser.controller";
import verifyIsAuth from "../middlewares/verifyIsAuth.middleware";
import { editAddressController } from "../controllers/address/editAddress.controller";
import { verifyUserIdForParamsExist } from "../middlewares/verifyUserIdForParams.middleware";
import { verifyIsEmpty } from "../middlewares/verifyIsEmpty.middleware";
import { deleteUserController } from "../controllers/users/deleteUser.controller";
import { ensureCpfWontRepeat } from "../middlewares/ensureCpfWontRepeat.middleware.";
import { ensureEmailWontRepeat } from "../middlewares/ensureEmailWontRepeat.middleware";
import { ensurePhoneWontRepeat } from "../middlewares/ensurePhoneWontRepeat.middleware";
import { listLoggedUserController } from "../controllers/users/listLoggedUser.controller";

const userRoutes: Router = Router();

userRoutes.post("", verifyDataIsValid(createUserBody), ensureEmailWontRepeat, ensureCpfWontRepeat, ensurePhoneWontRepeat, createUserController);

userRoutes.get("", verifyIsAuth, listLoggedUserController);

userRoutes.get("/:id", verifyUserIdForParamsExist, listUserController);

userRoutes.patch(
  "/:id",
  verifyUserIdForParamsExist,
  verifyIsAuth,
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

userRoutes.delete("", verifyIsAuth, deleteUserController);

export { userRoutes };
