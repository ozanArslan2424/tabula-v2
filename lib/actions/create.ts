"use server";
import db from "@/lib/db";
import {
    bookTable,
    noteTable,
    quicknoteTable,
    taskTable,
} from "@/lib/db/schema";
import { BookSchema, NoteSchema } from "@/lib/types/schemas";
import { toTitleCase } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { v4 as uuid } from "uuid";
import { z } from "zod";
import { BookInfoType } from "../types";

export const createBook = async (values: z.infer<typeof BookSchema>) => {
    try {
        const validatedFields = BookSchema.safeParse(values);
        if (!validatedFields.success)
            return { error: "Please check your inputs." };
        const { userId, title, description, hasTasks, type } =
            validatedFields.data;

        const generatedBookId = uuid();

        await db.insert(bookTable).values({
            id: generatedBookId,
            type: type,
            userId: userId,
            title: toTitleCase(title),
            description: description,
            hasTasks: hasTasks,
        });

        const newBook: BookInfoType = {
            id: generatedBookId,
            type: type,
            title: toTitleCase(title),
            description: description,
            createdAt: new Date(),
            hasTasks: hasTasks,
            tasks: [],
            notes: [],
        };

        return { success: "Book created.", data: newBook };
    } catch (error) {
        return { error: "There was an error. Please try again" };
    }
};

export const createNote = async (values: z.infer<typeof NoteSchema>) => {
    try {
        const validatedFields = NoteSchema.safeParse(values);
        if (!validatedFields.success)
            return { error: "Please check your inputs." };
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

export const createQuicknote = async (content: string, userId: string) => {
    try {
        const generatedQuicknoteId = uuid();

        await db.insert(quicknoteTable).values({
            id: generatedQuicknoteId,
            userId: userId,
            content: content,
        });

        const newQNote = {
            id: generatedQuicknoteId,
            userId: userId,
            content: content,
        };

        return { success: "Quicknote created.", data: newQNote };
    } catch (error) {
        return { error: "There was an error. Please try again" };
    }
};

export const createTask = async (
    name: string,
    bookId: string,
    userId: string,
) => {
    try {
        const generatedTaskId = uuid();

        await db.insert(taskTable).values({
            id: generatedTaskId,
            userId: userId,
            bookId: bookId,
            name: name,
        });

        const newTask = {
            id: generatedTaskId,
            name: name,
            completed: false,
            bookId: bookId,
            userId: userId,
        };

        return { success: "Task created.", data: newTask };
    } catch (error) {
        return { error: "There was an error. Please try again" };
    }
};
