"use server";
import db from "@/lib/db";
import { bookTable, noteTable, quicknoteTable, taskTable } from "@/lib/db/schema";
import { BookSchema, NoteSchema, QuicknoteSchema, TaskSchema } from "@/lib/types/schemas";
import { toTitleCase } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { v4 as uuid } from "uuid";
import { z } from "zod";

export const createBook = async (values: z.infer<typeof BookSchema>) => {
  try {
    const validatedFields = BookSchema.safeParse(values);
    if (!validatedFields.success) return { error: "Please check your inputs." };
    const { userId, title, description, hasTasks } = validatedFields.data;

    const generatedBookId = uuid();

    await db.insert(bookTable).values({
      id: generatedBookId,
      userId: userId,
      title: toTitleCase(title),
      description: description,
      hasTasks: hasTasks,
    });

    return { success: "Book created." };
  } catch (error) {
    return { error: "There was an error. Please try again" };
  } finally {
    revalidatePath("/dash", "page");
  }
};

export const createNote = async (values: z.infer<typeof NoteSchema>) => {
  try {
    const validatedFields = NoteSchema.safeParse(values);
    if (!validatedFields.success) return { error: "Please check your inputs." };
    const { bookId, title } = validatedFields.data;

    const generatedNoteId = uuid();

    await db.insert(noteTable).values({
      id: generatedNoteId,
      bookId: bookId,
      title: toTitleCase(title),
    });

    return { success: "Note created." };
  } catch (error) {
    return { error: "There was an error. Please try again" };
  } finally {
    revalidatePath(`/${values.bookId}`);
  }
};

export const createQuicknote = async (values: z.infer<typeof QuicknoteSchema>) => {
  try {
    const validatedFields = QuicknoteSchema.safeParse(values);
    if (!validatedFields.success) return { error: "Please check your inputs." };
    const { userId, content } = validatedFields.data;
    const generatedQuicknoteId = uuid();

    await db.insert(quicknoteTable).values({
      id: generatedQuicknoteId,
      userId: userId,
      content: content,
    });
    return { success: "Quicknote created." };
  } catch (error) {
    return { error: "There was an error. Please try again" };
  } finally {
    revalidatePath("/dash", "page");
  }
};

export const createTask = async (values: z.infer<typeof TaskSchema>) => {
  try {
    const validatedFields = TaskSchema.safeParse(values);
    if (!validatedFields.success) return { error: "Please check your inputs." };
    const { userId, bookId, name } = validatedFields.data;

    const generatedTaskId = uuid();

    await db.insert(taskTable).values({
      id: generatedTaskId,
      userId: userId,
      bookId: bookId,
      name: name,
    });

    return { success: "Task created." };
  } catch (error) {
    return { error: "There was an error. Please try again" };
  } finally {
    revalidatePath(`/${values.bookId}`);
  }
};
