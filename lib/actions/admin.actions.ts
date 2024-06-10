"use server";
import { sendEmail } from "@/lib/actions/mail";
import { getUserByEmail, getUserById } from "@/lib/actions/read";
import db from "@/lib/db";
import { bugTable, registerTokenTable, userTable } from "@/lib/db/schema";
import { BugSchema } from "@/lib/types/schemas";
import { eq } from "drizzle-orm";
import { generateId } from "lucia";
import { v4 as uuid } from "uuid";
import { z } from "zod";

export const createUser = async (email: string) => {
    try {
        const generatedId = uuid();
        const generatedToken = generateId(20);

        await db.insert(userTable).values({
            id: generatedId,
            email: email,
            emailVerified: true,
        });

        await db.insert(registerTokenTable).values({
            id: generatedToken,
            token: generatedToken,
            email: email,
            expires: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
            userId: generatedId,
        });

        sendEmail({
            type: "invite",
            email: email,
            token: generatedToken,
        });

        return { success: "User created." };
    } catch (error) {
        return { error: "There was an error. Please try again" };
    }
};

export const createNewToken = async (userId: string) => {
    try {
        const existingUser = await getUserById(userId);
        if (!existingUser) return { error: "User not found." };
        const generatedToken = generateId(20);

        await db
            .update(userTable)
            .set({ emailVerified: false })
            .where(eq(userTable.id, userId));

        await db
            .update(registerTokenTable)
            .set({
                id: generatedToken,
                token: generatedToken,
                email: existingUser.email,
                expires: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
                userId: userId,
            })
            .where(eq(registerTokenTable.userId, userId));

        sendEmail({
            type: "invite",
            email: existingUser.email,
            token: generatedToken,
        });

        return { success: "New invite link created." };
    } catch (error) {
        return { error: "There was an error. Please try again" };
    }
};

export const getAllUsers = async () => {
    const users = await db.query.userTable.findMany({
        columns: {
            id: true,
            username: true,
            email: true,
            emailVerified: true,
            image: true,
            role: true,
        },
        with: {
            books: { columns: { id: true } },
            tasks: { columns: { id: true } },
            quicknotes: { columns: { id: true } },
            bugs: { columns: { id: true } },
        },
    });
    return users;
};

export const getAllBugs = async () => {
    const bugs = await db.query.bugTable.findMany({
        columns: {
            id: true,
            subject: true,
            description: true,
            resolved: true,
        },
        with: {
            user: { columns: { id: true, username: true } },
        },
    });
    return bugs;
};

export const updateUserRole = async (
    userId: string,
    role: "admin" | "user",
) => {
    try {
        await db
            .update(userTable)
            .set({ role })
            .where(eq(userTable.id, userId));

        return { success: "User role updated." };
    } catch (error) {
        return { error: "There was an error. Please try again" };
    }
};

export const registerBug = async (values: z.infer<typeof BugSchema>) => {
    try {
        const user = await getUserByEmail(values.email);
        if (!user) return { error: "User not found." };

        const generatedId = uuid();
        await db.insert(bugTable).values({
            id: generatedId,
            subject: values.subject,
            description: values.description,
            userId: user.id,
            createdAt: new Date(),
            resolved: false,
        });
    } catch (error) {
        return {
            error: "Hmm... There was an error reporting the bug... Shameful...",
        };
    }
};

export const resolveBug = async (bugId: string) => {
    try {
        await db
            .update(bugTable)
            .set({ resolved: true })
            .where(eq(bugTable.id, bugId));

        return { success: "Bug resolved." };
    } catch (error) {
        return { error: "There was an error. Please try again" };
    }
};

export const deleteBug = async (bugId: string) => {
    try {
        await db.delete(bugTable).where(eq(bugTable.id, bugId));
        return { success: "Bug deleted." };
    } catch (error) {
        return { error: "There was an error. Please try again" };
    }
};

export const deleteUser = async (userId: string) => {
    try {
        await db.delete(userTable).where(eq(userTable.id, userId));
        return { success: "User deleted." };
    } catch (error) {
        return { error: "There was an error. Please try again" };
    }
};
