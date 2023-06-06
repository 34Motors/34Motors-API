import { z } from "zod";
import { createCarBody } from "../schemas/cars.schema";

type ICarsBody = z.infer<typeof createCarBody>

export { ICarsBody }