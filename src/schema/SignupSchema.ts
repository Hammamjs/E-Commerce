import z from 'zod';
import { PasswordSchemaValidation } from './PasswordValidation';

export const SignupValidation = z
  .object({
    username: z.string().min(3, 'Username cannot be less than 3 charcters'),
    password: PasswordSchemaValidation,
    confirmPassword: z.string(),
    email: z.email('Only email accepted'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: 'Passwords not match',
    path: ['confirmPassword'],
  });

export type SignupValidationType = z.infer<typeof SignupValidation>;
