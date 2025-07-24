import { z } from 'zod';

const registerValidationSchema = z.object({
  name: z.string().min(1, 'Please enter your name!'),
  email: z.string().email('Please enter a valid email address!'),
  mobileNumber: z
    .string()
    .regex(/^\d{11}$/, 'Mobile number must be 11 digits!'),
  password: z.string().min(6, 'Must be at least 6 characters.'),
});

export default registerValidationSchema;
