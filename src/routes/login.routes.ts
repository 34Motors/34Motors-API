import { Router } from "express";
import verifyDataIsValid from "../middlewares/verifyDataIsValid.middleware";
import { loginSchema } from "../schemas/login.schema";

const loginRoutes: Router = Router();

loginRoutes.post("", verifyDataIsValid(loginSchema), /* createLoginController */)

export { loginRoutes };
