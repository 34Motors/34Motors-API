import { z } from "zod";

const createUserBody = z.object({
  name: z.string(),
  email: z.string(),
  cpf: z.string(),
  phone: z.string(),
  birthDate: z.string(),
  description: z.string().nullable(),

  cep: z.string(),
  state: z.string(),
  city: z.string(),
  street: z.string(),
  number: z.string(),
  complement: z.string(),

  isSeller: z.boolean(),
  password: z.string(),
});

const returnUser = createUserBody.extend({
  id: z.number(),
});

export { createUserBody, returnUser };
