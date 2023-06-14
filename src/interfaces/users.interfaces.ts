import { z } from "zod";
import { createUserBody, returnUser } from "../schemas/users.schema";

type tUserRequest = z.infer<typeof createUserBody>;
type tUserReturn = z.infer<typeof returnUser>;

export { tUserRequest, tUserReturn };
