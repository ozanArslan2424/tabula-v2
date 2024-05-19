import { z } from "zod";

export const SettingsSchema = z.object({
  userId: z.string(),
  username: z.string().min(4, { message: "Username must be at least 4 characters." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
  newPassword: z.optional(z.string().min(8, { message: "New password must be at least 8 characters." })),
});

export const RegisterSchema = z.object({
  username: z.string().min(4, { message: "Username must be at least 4 characters." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
});

export const LoginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
});

export const EmailSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
});

export const BugSchema = z.object({
  email: z.string().email(),
  subject: z.string().min(4, { message: "Subject must be at least 4 characters." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
});

export const BookSchema = z.object({
  userId: z.string(),
  title: z.string().min(2, { message: "Book title must be at least 2 characters." }),
  description: z.optional(z.string()),
  hasTasks: z.boolean(),
});

export const BookSettingsSchema = z.object({
  bookId: z.string(),
  title: z.string().min(2, { message: "Book title must be at least 2 characters." }),
  description: z.optional(z.string()),
  hasTasks: z.boolean(),
});

export const NoteSchema = z.object({
  bookId: z.string(),
  title: z.string().min(2, { message: "Note title must be at least 2 characters." }),
});

export const NoteTitleSchema = z.object({
  noteId: z.string(),
  title: z.string().min(2, { message: "Note title must be at least 2 characters." }),
});

export const QuicknoteSchema = z.object({
  userId: z.string(),
  content: z.string().min(1, { message: "Quicknote cannot be empty." }),
});

export const TaskSchema = z.object({
  name: z.string().min(1, { message: "Task content cannot be empty." }),
  completed: z.boolean().default(false),
  bookId: z.string(),
  userId: z.string(),
});
