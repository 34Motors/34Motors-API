import { Router } from "express";
import { createUserController } from "../controllers/users/createUser.controller";
import verifyDataIsValid from "../middlewares/verifyDataIsValid.middleware";
import { createUserBody } from "../schemas/users.schema";
import { listUserController } from "../controllers/users/listUser.controller";
import verifyIsAuth from "../middlewares/verifyIsAuth.middleware";
import { deleteUserController } from "../controllers/users/deleteUser.controller";

const userRoutes: Router = Router();

userRoutes.post("", verifyDataIsValid(createUserBody) ,createUserController);
userRoutes.get("/:id" ,listUserController);
userRoutes.delete("", verifyIsAuth, deleteUserController);

export { userRoutes };
