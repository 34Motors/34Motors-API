import { z } from "zod";

const createCarBody = z.object({
  brand: z.string().max(20),
  model: z.string().max(50),
  year: z.string().max(4),
  fuelType: z.enum(["Hibrido", "Flex", "Eletrico"]),
  quilometers: z.number(),
  color: z.string().max(16),
  fipePrice: z.string(),
  price: z.number(),
  description: z.string(),
  published: z.boolean().default(true),
});

const uploadFrontImageRequest = z.object({
  frontImage: z.custom<Express.Multer.File>() || z.string(),
});

const uploadCarImages = z.object({
  images: z.custom<Express.Multer.File>().array(),
});

const carEditSchema = createCarBody.partial();

export {
  createCarBody,
  uploadFrontImageRequest,
  uploadCarImages,
  carEditSchema,
};
