import { z } from "zod";

// Regular expression for password validation
// const passwordValidation = new RegExp(
//   /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/
// );

export const UserSchema = z.object({
  firstName: z.string().min(2, "Name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required"),
  message: z.string().optional(),
});

export const AdminSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Your password must contain at least 8 characters")
    .regex(/[A-Z]/, "Your password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Your password must contain at least one number")
    .regex(
      /[^a-zA-Z0-9]/,
      "Password must contain at least one symbol (e.g. !, @, #)"
    ),
});

export type UserFormData = z.infer<typeof UserSchema>;
export type AdminFormData = z.infer<typeof AdminSchema>;
