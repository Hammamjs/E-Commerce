import z from 'zod';
import { PasswordSchemaValidation } from './PasswordValidation';

export const UserSchema = z
  .object({
    username: z.string().min(6, 'Username is to short').optional(),
    email: z.email('Email not valid').optional(),
    bio: z.string().optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
    currentPassword: z.string().min(1, 'Current password required'),
    password: PasswordSchemaValidation,
    confirmPassword: z.string().optional(),
  })
  .refine((data) => data.password !== data.confirmPassword, {
    error: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type UserSchemaType = z.infer<typeof UserSchema>;
