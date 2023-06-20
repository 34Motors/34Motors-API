import { z } from "zod";
import { addressEditSchema } from "../schemas/users.schema";

type IAddressEdit = z.infer<typeof addressEditSchema>

export { IAddressEdit };
