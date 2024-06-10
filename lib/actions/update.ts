"use server";
import db from "@/lib/db";
import { bookTable, noteTable, taskTable } from "@/lib/db/schema";
import { BookSettingsSchema } from "@/lib/types/schemas";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// updateBookSettings
export const updateBookSettings = async (
    values: z.infer<typeof BookSettingsSchema>,
) => {
    const validatedFields = BookSettingsSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: "Please check your inputs." };
    }
    const { bookId, title, description, hasTasks } = validatedFields.data;
    try {
        await db
            .update(bookTable)
            .set({
                title: title,
                description: description,
                hasTasks: hasTasks,
            })
            .where(eq(bookTable.id, bookId));

        return { success: "Book settings changed." };
    } catch (error) {
        return { error: "There was an error. Please try again" };
    } finally {
        revalidatePath("/dash", "page");
    }
};

// updateNote
export const updateNote = async (noteId: string, editorContent: string) => {
    try {
        await db
            .update(noteTable)
            .set({ content: editorContent })
            .where(eq(noteTable.id, noteId));

        return { success: "Note updated." };
    } catch (error) {
        return { error: "There was an error. Please try again" };
    }
};

// updateNoteTitle
export async function updateNoteTitle(noteId: string, title: string) {
    await db
        .update(noteTable)
        .set({ title: title })
        .where(eq(noteTable.id, noteId));
}

// updateTask
export const updateTask = async (taskId: string, completed: boolean) => {
    try {
        await db
            .update(taskTable)
            .set({ completed: completed })
            .where(eq(taskTable.id, taskId));

        return { success: "Task updated." };
    } catch (error) {
        return { error: "There was an error. Please try again" };
    }
};
