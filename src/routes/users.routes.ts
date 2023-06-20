import { Router } from "express";
import { createUserController } from "../controllers/users/createUser.controller";
import verifyDataIsValid from "../middlewares/verifyDataIsValid.middleware";
import { createUserBody, userEditSchema } from "../schemas/users.schema";
import { listUserController } from "../controllers/users/listUser.controller";
import { verifyUserExists } from "../middlewares/verifyUserExists.middleware";
import { editUserController } from "../controllers/users/editUser.controller";
import verifyIsAuth from "../middlewares/verifyIsAuth.middleware";

const userRoutes: Router = Router();

userRoutes.post("", verifyDataIsValid(createUserBody), createUserController);
userRoutes.get("/:id", listUserController);
userRoutes.patch(
  "/:id",
  verifyIsAuth,
  verifyDataIsValid(userEditSchema),
  editUserController
);

export { userRoutes };
