import { z } from 'zod';

export const createUserSchema = z.object({
  firstName: z.string().min(1, { error: 'Firstname should not be empty' }),
  lastName: z.string().min(1, { error: 'Lastname should not be empty' }),
  email: z.email().optional(),
  username: z.string().min(1, { error: 'Username should not be empty' }),
  password: z.string().min(1, { error: 'Password should not be empty' }),
  dateTimeCreated: z.date().optional(),
});

export const updateUserSchema = z.object({
  firstName: z
    .string()
    .min(1, { error: 'Firstname should not be empty' })
    .optional(),
  lastName: z
    .string()
    .min(1, { error: 'Lastname should not be empty' })
    .optional(),
  email: z.email().optional(),
  username: z
    .string()
    .min(1, { error: 'Username should not be empty' })
    .optional(),
  password: z
    .string()
    .min(1, { error: 'Password should not be empty' })
    .optional(),
});

export type CreateUserDto = z.infer<typeof createUserSchema>;
export type UpdateUserDto = Partial<typeof updateUserSchema>;
