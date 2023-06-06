import { z } from "zod";
import { imageBodySchema } from "../schemas/images.schema";

type IImagesBody = z.infer<typeof imageBodySchema>

export { IImagesBody }