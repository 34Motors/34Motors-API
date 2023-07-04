import { z } from "zod";
import { loginSchema } from "../schemas/login.schema";

type tLoginRequest = z.infer<typeof loginSchema>;

export { tLoginRequest };
