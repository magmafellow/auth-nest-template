import { z } from 'zod';

const createUserSchema = z.object({
  firstName: z.string().min(1, { error: 'Firstname should not be empty' }),
  lastName: z.string().min(1, { error: 'Lastname should not be empty' }),
  email: z.email().optional(),
  username: z.string().min(1, { error: 'Username should not be empty' }),
  password: z.string().min(1, { error: 'Password should not be empty' }),
  dateTimeCreated: z.date(),
});

export type CreateUserDto = z.infer<typeof createUserSchema>
