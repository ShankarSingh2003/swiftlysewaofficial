import { z } from "zod";


// phone validation (Brazil)
const indianPhoneValidation = new RegExp(
    /^(?:\+91|91)?\s?[6-9]\d{9}$/
  );
  
export const validationSchema = z
  .object({
    name: z.string().min(1, "Name is required."),
    email: z.string().min(1, "Email is required.").email("Invalid email address."),
    phone: z
    .string()
    .min(1, { message: 'Must have at least 1 character' })
    .regex(indianPhoneValidation, { message: 'invalid phone' }),
    password: z.string().min(6, "Password must be at least 6 characters."),
    confirmPassword: z.string().min(1, "Confirm Password is required."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match.",
  });
