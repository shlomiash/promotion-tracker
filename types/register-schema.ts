import {z} from 'zod'

export const RegisterSchema = z.object({
    name: z.string().min(2 , {message:"Name must be at least 2 characters long"}),
    email: z.string().email("Invalid email format"),
    password: z.string().min(6 , {message:"Password must be at least 6 characters long"}),
    confirmPassword: z.string().min(6 , {message:"Password must be at least 6 characters long"})
  }).refine(value => value.password === value.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

