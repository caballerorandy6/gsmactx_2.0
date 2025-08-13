import { z } from "zod";

// Regular expression for password validation
// const passwordValidation = new RegExp(
//   /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/
// );

// Zod schema for user
export const UserSchema = z.object({
  firstName: z.string().min(2, "Name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required"),
  message: z.string().optional(),
  subscribe: z.boolean().default(true),
});

// Zod schema for admin
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

// Zod schema for campaign
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const ACCEPTED_FILE_TYPES = [
  "image/jpg",
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/avif",
];

export const CampaignSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(2, "Title is required"),
  subject: z.string().min(2, "Subject is required"),
  content: z.string().min(10, "Content is required"),
  image: z
    .any()
    .optional()
    .refine((file) => {
      // Si no hay archivo, está bien
      if (!file) return true;

      // Si es un string (URL existente), está bien
      if (typeof file === "string") return true;

      // Si es un File, validar tamaño
      if (file instanceof File) {
        return file.size <= MAX_FILE_SIZE;
      }

      return true;
    }, `El tamaño máximo de la imagen es 5MB.`)
    .refine((file) => {
      // Si no hay archivo, está bien
      if (!file) return true;

      // Si es un string (URL existente), está bien
      if (typeof file === "string") return true;

      // Si es un File, validar tipo
      if (file instanceof File) {
        return ACCEPTED_FILE_TYPES.includes(file.type);
      }

      return true;
    }, "Unsupported file type. Accepted types are: jpg, jpeg, png, gif, webp, avif."),
});

export type UserFormData = z.infer<typeof UserSchema>;
export type AdminFormData = z.infer<typeof AdminSchema>;
export type CampaignFormData = z.infer<typeof CampaignSchema>;
