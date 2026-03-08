import { z } from "zod";


export const createCatSchema = z.object({
  name: z.string(),
  age: z.string(),
  breed: z.string(),
}).required()


export type CreateCatDto_Zod = z.infer<typeof createCatSchema>

