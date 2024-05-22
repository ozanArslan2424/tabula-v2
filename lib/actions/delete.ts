"use server";
import db from "@/lib/db";
import { bookTable, noteTable, quicknoteTable, taskTable } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const deleteBook = async (bookId: string) => {
  try {
    await db.delete(bookTable).where(eq(bookTable.id, bookId));

    return { success: "Book deleted." };
  } catch (error) {
    return { error: "There was an error. Please try again" };
  } finally {
    revalidatePath("/dash", "page");
  }
};

export const deleteNote = async (noteId: string, bookId: string) => {
  try {
    await db.delete(noteTable).where(eq(noteTable.id, noteId));

    return { success: "Note deleted." };
  } catch (error) {
    return { error: "There was an error. Please try again" };
  } finally {
    revalidatePath(`/${bookId}`, "page");
  }
};

export const deleteTask = async (taskId: string, bookId: string) => {
  try {
    await db.delete(taskTable).where(eq(taskTable.id, taskId));

    return { success: "Task deleted." };
  } catch (error) {
    return { error: "There was an error. Please try again" };
  } finally {
    revalidatePath(`/${bookId}`, "page");
  }
};

export const deleteQuicknote = async (qNoteId: string) => {
  try {
    await db.delete(quicknoteTable).where(eq(quicknoteTable.id, qNoteId));

    return { success: "Quicknote deleted." };
  } catch (error) {
    return { error: "There was an error. Please try again" };
  } finally {
    revalidatePath("/dash", "page");
  }
};
