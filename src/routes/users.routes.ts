import { Router } from "express";
import { createUserController } from "../controllers/users/createUser.controller";
import verifyDataIsValid from "../middlewares/verifyDataIsValid.middleware";
import { createUserBody } from "../schemas/users.schema";

const userRoutes: Router = Router();

userRoutes.post("", verifyDataIsValid(createUserBody) ,createUserController);

export { userRoutes };
