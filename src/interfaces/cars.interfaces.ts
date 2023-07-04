import { z } from "zod";
import { carEditSchema, createCarBody, uploadFrontImageRequest } from "../schemas/cars.schema";

type ICarsBody = z.infer<typeof createCarBody>

type IUploadFrontImage = z.infer<typeof uploadFrontImageRequest>

type ICarsEditedBody = z.infer<typeof carEditSchema>

export { ICarsBody, ICarsEditedBody, IUploadFrontImage }
