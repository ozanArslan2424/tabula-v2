"use server";
import db from "@/lib/db";
import { eq } from "drizzle-orm";

export const getBookList = async (userId: string) => {
    const bookList = await db.query.bookTable.findMany({
        where: (table) => eq(table.userId, userId),
        columns: {
            id: true,
            title: true,
        },
    });

    return bookList;
};

export const getAllBooks = async (userId: string) => {
    const bookList = await db.query.bookTable.findMany({
        where: (table) => eq(table.userId, userId),
        columns: {
            id: true,
            type: true,
            title: true,
            description: true,
            createdAt: true,
            hasTasks: true,
        },
        with: {
            notes: {
                columns: {
                    title: true,
                },
            },
            tasks: {
                columns: {
                    name: true,
                },
            },
        },
    });

    return bookList;
};

export const getBookContent = async (bookId: string) => {
    const book = await db.query.bookTable.findFirst({
        where: (table) => eq(table.id, bookId),
        with: {
            notes: true,
            tasks: true,
        },
    });

    if (!book) return null;
    return book;
};

export const getQuicknotes = async (userId: string) => {
    const quicknotes = await db.query.quicknoteTable.findMany({
        where: (table) => eq(table.userId, userId),
    });

    return quicknotes;
};

export const getUserById = async (userId: string) => {
    const user = await db.query.userTable.findFirst({
        where: (table) => eq(table.id, userId),
    });

    return user;
};

export const getUserByEmail = async (email: string) => {
    const user = await db.query.userTable.findFirst({
        where: (table) => eq(table.email, email),
    });

    return user;
};

export const getCurrentBook = async (bookId: string) => {
    const book = await db.query.bookTable.findFirst({
        where: (table) => eq(table.id, bookId),
        columns: {
            id: true,
            title: true,
            description: true,
            hasTasks: true,
        },
        with: {
            notes: {
                columns: {
                    title: true,
                    createdAt: true,
                },
            },
            tasks: true,
        },
    });

    return book;
};
