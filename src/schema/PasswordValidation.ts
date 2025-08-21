import z from 'zod';

export const PasswordSchemaValidation = z
  .string()
  .min(8, 'Password must be at least 8 charcters')
  .regex(/[A-Z]/, 'Password must contain one uppercase at least')
  .regex(/[0-9]/, 'Passowrd must contain one number at least')
  .regex(/[^A-Za-z0-9]/, 'Password must contain special charcter');
