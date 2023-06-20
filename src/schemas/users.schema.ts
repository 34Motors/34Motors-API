import { z } from "zod";

const validStates = [
  "AC",
  "AL",
  "AP",
  "AM",
  "BA",
  "CE",
  "DF",
  "ES",
  "GO",
  "MA",
  "MS",
  "MT",
  "MG",
  "PA",
  "PB",
  "PR",
  "PE",
  "PI",
  "RJ",
  "RN",
  "RS",
  "RO",
  "RR",
  "SC",
  "SP",
  "SE",
  "TO",
] as const;

const createUserBody = z.object({
  name: z.string().max(127),
  email: z.string().max(127),
  cpf: z.string().max(11),
  phone: z.string().max(11),
  birthDate: z.string(),
  description: z.string().optional(),

  cep: z.string().max(8),
  state: z.enum(validStates),
  city: z.string().max(50),
  street: z.string().max(127),
  number: z.string().max(8),
  complement: z.string().max(50).optional(),

  isSeller: z.boolean().default(false),
  password: z.string(),
});

const returnUser = createUserBody.extend({
  id: z.number(),
});

const userEditSchema = z
  .object({
    name: z.string().max(127),
    email: z.string().max(127),
    cpf: z.string().max(11),
    phone: z.string().max(11),
    birthDate: z.string(),
    description: z.string().optional(),
    password: z.string(),
  })
  .partial();

export { createUserBody, returnUser, userEditSchema };
