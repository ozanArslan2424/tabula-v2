"use server";
import db from "@/lib/db";
import {
    bookTable,
    noteTable,
    quicknoteTable,
    taskTable,
} from "@/lib/db/schema";
import { BookSchema, SnippetSchema } from "@/lib/types/schemas";
import { toTitleCase } from "@/lib/utils";
import { v4 as uuid } from "uuid";
import { z } from "zod";
import { BookInfoType, NoteType } from "../types";

export const createBook = async (values: z.infer<typeof BookSchema>) => {
    try {
        const validatedFields = BookSchema.safeParse(values);
        if (!validatedFields.success)
            return { error: "Please check your inputs." };
        const { userId, title, description, hasTasks, type } =
            validatedFields.data;

        const generatedBookId = uuid();

        const newBook = {
            id: generatedBookId,
            type: type,
            userId: userId,
            title: toTitleCase(title),
            description: description,
            hasTasks: hasTasks,
        };

        await db.insert(bookTable).values(newBook);

        const newBookPlaceholder: BookInfoType = {
            ...newBook,
            createdAt: new Date(),
            tasks: [],
            notes: [],
        };

        return {
            success: "Book created.",
            data: newBookPlaceholder,
        };
    } catch (error) {
        return { error: "There was an error. Please try again" };
    }
};

export const createNote = async (bookId: string, title: string) => {
    try {
        const generatedNoteId = uuid();

        const newNote: NoteType = {
            id: generatedNoteId,
            bookId: bookId,
            title: toTitleCase(title),
            content: "",
            createdAt: new Date(),
        };

        await db.insert(noteTable).values(newNote);

        return { success: "Note created.", data: newNote };
    } catch (error) {
        return { error: "There was an error. Please try again" };
    }
};

export const createSnippet = async (values: z.infer<typeof SnippetSchema>) => {
    try {
        const validatedFields = SnippetSchema.safeParse(values);
        if (!validatedFields.success)
            return { error: "Please check your inputs." };
        const { bookId, title, content } = validatedFields.data;

        const generatedNoteId = uuid();

        const newSnippet = {
            id: generatedNoteId,
            bookId: bookId,
            title: toTitleCase(title),
            content: content,
        };

        await db.insert(noteTable).values(newSnippet);

        return {
            success: "Note created.",
            data: { ...newSnippet, createdAt: new Date() },
        };
    } catch (error) {
        return { error: "There was an error. Please try again" };
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
