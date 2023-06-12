import { Router } from "express";
import verifyDataIsValid from "../middlewares/verifyDataIsValid.middleware";
import { loginSchema } from "../schemas/login.schema";
import { createLoginController } from "../controllers/login/login.controller";

const loginRoutes: Router = Router();

loginRoutes.post("", verifyDataIsValid(loginSchema), createLoginController)

export { loginRoutes };
