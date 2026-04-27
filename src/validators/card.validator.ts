import { z } from 'zod';

export const cardValidationSchema = z.object({
  cardNumber: z
    .string({ message: 'Card number is required' })
    .min(1, { message: 'Card number cannot be empty' }),
});