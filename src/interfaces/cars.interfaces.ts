import { z } from "zod";
import { carEditSchema, createCarBody } from "../schemas/cars.schema";

type ICarsBody = z.infer<typeof createCarBody>

type ICarsEditedBody = z.infer<typeof carEditSchema>

export { ICarsBody, ICarsEditedBody }
