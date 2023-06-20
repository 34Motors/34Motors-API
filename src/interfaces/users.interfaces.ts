import { z } from "zod";
import { createUserBody, returnUser, userEditSchema } from "../schemas/users.schema";

type tUserRequest = z.infer<typeof createUserBody>;
type tUserReturn = z.infer<typeof returnUser>;


type IUserEdit = z.infer<typeof userEditSchema>

export { tUserRequest, tUserReturn, IUserEdit };
