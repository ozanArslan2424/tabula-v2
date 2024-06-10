"use server";
import { getUserByEmail } from "@/lib/actions/read";
import { getSession, lucia } from "@/lib/auth";
import db from "@/lib/db";
import { registerTokenTable, userTable } from "@/lib/db/schema";
import {
    LoginSchema,
    RegisterSchema,
    SettingsSchema,
} from "@/lib/types/schemas";
import { hash, verify } from "@node-rs/argon2";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import * as z from "zod";

export const verifyInvite = async (token: string) => {
    try {
        // find registerToken in db -> existingToken
        const existingToken = await db.query.registerTokenTable.findFirst({
            where: eq(registerTokenTable.token, token),
        });

        // if no existingToken return error
        if (!existingToken) return { error: "This link/token is invalid." };

        // if existingToken expired return error
        const hasExpired = new Date(existingToken.expires) < new Date();

        if (hasExpired) return { expired: "This link/token has expired." };

        // find existingUser in db with email
        const existingUser = await getUserByEmail(existingToken.email);

        // if no existingUser return error
        if (!existingUser) {
            return { error: "Email invalid." };
        }

        // if user already verified return error
        if (existingUser.emailVerified) {
            return { success: "Email already validated." };
        }

        // update existingUser -> emailVerified true, email: existingToken.email
        await db
            .update(userTable)
            .set({
                email: existingToken.email,
                emailVerified: true,
            })
            .where(eq(userTable.id, existingUser.id));

        // delete existingToken
        await db
            .delete(registerTokenTable)
            .where(eq(registerTokenTable.id, existingToken.id));

        return { success: "Email validated.", email: existingToken.email };
    } catch (error) {
        return { error: "There was an error. Please try again" };
    }
};

export const registerAction = async (
    values: z.infer<typeof RegisterSchema>,
) => {
    try {
        const validatedFields = RegisterSchema.safeParse(values);

        if (!validatedFields.success) {
            return { error: "There was an error. Please try again" };
        }

        const existingUser = await getUserByEmail(validatedFields.data.email);

        if (!existingUser) return { error: "Invite not found." };

        const hashedPassword = await hash(validatedFields.data.password);

        await db
            .update(userTable)
            .set({
                username: validatedFields.data.username,
                password: hashedPassword,
            })
            .where(eq(userTable.email, validatedFields.data.email));

        // create lucia session
        // create and set sessionCookie
        const session = await lucia.createSession(existingUser.id, {
            expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 30 days from now
        });
        const sessionCookie = lucia.createSessionCookie(session.id);
        cookies().set(
            sessionCookie.name,
            sessionCookie.value,
            sessionCookie.attributes,
        );

        redirect("/dash");
    } catch {
        return { error: "There was an error. Please try again" };
    }
};

export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: "There was an error. Please try again" };
    }

    const existingUser = await db.query.userTable.findFirst({
        where: eq(userTable.email, validatedFields.data.email),
    });

    if (!existingUser || !existingUser.password) {
        return { error: "User not found." };
    }

    const isValidPassword = await verify(
        existingUser.password,
        validatedFields.data.password,
    );

    if (!isValidPassword) {
        return { error: "Mistake in email or password" };
    }

    const session = await lucia.createSession(existingUser.id, {
        expiresIn: 60 * 60 * 24 * 30, // 30 days
    });

    const sessionCookie = lucia.createSessionCookie(session.id);

    cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
    );

    return { success: "Logged in." };
};

export const logout = async () => {
    try {
        const { session } = await getSession();

        if (!session) {
            return { error: "Not logged in." };
        }

        await lucia.invalidateSession(session.id);

        const sessionCookie = lucia.createBlankSessionCookie();

        cookies().set(
            sessionCookie.name,
            sessionCookie.value,
            sessionCookie.attributes,
        );
    } catch (error) {
        return { error: "There was an error. Please try again" };
    }
};

export const updateSettings = async (
    values: z.infer<typeof SettingsSchema>,
) => {
    try {
        const validatedFields = SettingsSchema.safeParse(values);

        if (!validatedFields.success) {
            return { error: "There was an error. Please try again" };
        }

        const currentUser = await getSession();

        if (!currentUser || !currentUser.user) {
            return { error: "Not logged in." };
        }

        const existingUser = await getUserByEmail(currentUser.user.email);

        if (!existingUser) {
            return { error: "User not found." };
        }

        const passwordConfirmed = await verify(
            existingUser.password!,
            validatedFields.data.password,
        );

        if (!passwordConfirmed) {
            return { error: "Mistake in email or password" };
        }

        if (validatedFields.data.newPassword && passwordConfirmed) {
            const hashedPassword = await hash(validatedFields.data.newPassword);

            await db
                .update(userTable)
                .set({
                    username: validatedFields.data.username,
                    email: validatedFields.data.email,
                    password: hashedPassword,
                })
                .where(eq(userTable.id, validatedFields.data.userId));
        }

        await db
            .update(userTable)
            .set({
                username: validatedFields.data.username,
                email: validatedFields.data.email,
            })
            .where(eq(userTable.id, validatedFields.data.userId));

        return { success: "Settings updated." };
    } catch {
        return { error: "There was an error. Please try again" };
    }
};
