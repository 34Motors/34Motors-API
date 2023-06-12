import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Deve ser um e-mail válido").max(127),
  password: z.string().min(4).max(20),
});

export { loginSchema };
