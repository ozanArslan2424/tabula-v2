import { z } from "zod";

export const SettingsSchema = z.object({
  userId: z.string(),
  username: z.string().min(4, { message: "Kullanıcı adı en az 4 karakterden oluşmalı." }),
  email: z.string().email({ message: "Lütfen geçerli bir e-posta girin." }),
  password: z.string().min(8, { message: "Şifre en az 8 karakter olmalı." }),
  newPassword: z.optional(z.string().min(8, { message: "Yeni şifre en az 8 karakterden oluşmalıdır." })),
});

export const RegisterSchema = z.object({
  username: z.string().min(4, { message: "Kullanıcı adı en az 4 karakterden oluşmalı." }),
  email: z.string().email({ message: "Lütfen geçerli bir e-posta girin." }),
  password: z.string().min(8, { message: "Şifre en az 8 karakter olmalı." }),
});

export const LoginSchema = z.object({
  email: z.string().email({ message: "Lütfen geçerli bir e-posta girin." }),
  password: z.string().min(8, { message: "Şifre en az 8 karakter olmalı." }),
});

export const EmailSchema = z.object({
  email: z.string().email({ message: "Lütfen geçerli bir e-posta girin." }),
});

export const BugSchema = z.object({
  email: z.string().email(),
  subject: z.string().min(2, { message: "Konu en az 2 karakterden oluşmalıdır." }),
  description: z.string().min(10, { message: "Açıklama en az 10 karakterden oluşmalıdır." }),
});

export const BookSchema = z.object({
  userId: z.string(),
  title: z.string().min(2, { message: "Kitap adı en az 2 karakterden oluşmalıdır." }),
  description: z.optional(z.string()),
  hasTasks: z.boolean(),
});

export const BookSettingsSchema = z.object({
  bookId: z.string(),
  title: z.string().min(2, { message: "Kitap adı en az 2 karakterden oluşmalıdır." }),
  description: z.optional(z.string()),
  hasTasks: z.boolean(),
});

export const NoteSchema = z.object({
  bookId: z.string(),
  title: z.string().min(2, { message: "Not başlığı en az 2 karakterden oluşmalıdır." }),
});

export const NoteTitleSchema = z.object({
  noteId: z.string(),
  title: z.string().min(2, { message: "Not başlığı en az 2 karakterden oluşmalıdır." }),
});

export const QuicknoteSchema = z.object({
  userId: z.string(),
  content: z.string().min(1, { message: "Not boş olamaz." }),
});

export const TaskSchema = z.object({
  name: z.string().min(1, { message: "Not boş olamaz." }),
  completed: z.boolean().default(false),
  bookId: z.string(),
  userId: z.string(),
});
