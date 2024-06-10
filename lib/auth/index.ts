import adapter from "@/lib/auth/adapter";
import { Lucia } from "lucia";
import { cookies } from "next/headers";
import { cache } from "react";

export const lucia = new Lucia(adapter, {
    sessionCookie: {
        // this sets cookies with super long expiration
        // since Next.js doesn't allow Lucia to extend cookie expiration when rendering pages
        expires: false,
        attributes: {
            // set to `true` when using HTTPS
            secure: process.env.NODE_ENV === "production",
        },
    },
    getUserAttributes: (attributes) => {
        return {
            id: attributes.id,
            email: attributes.email,
            username: attributes.username,
            image: attributes.image,
            role: attributes.role,
        };
    },
});

export const getSession = cache(async () => {
    const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;

    if (!sessionId)
        return {
            user: null,
            session: null,
        };

    const { user, session } = await lucia.validateSession(sessionId);

    try {
        if (session && session.fresh) {
            const sessionCookie = lucia.createSessionCookie(session.id);
            cookies().set(
                sessionCookie.name,
                sessionCookie.value,
                sessionCookie.attributes,
            );
        }

        if (!session) {
            const sessionCookie = lucia.createBlankSessionCookie();
            cookies().set(
                sessionCookie.name,
                sessionCookie.value,
                sessionCookie.attributes,
            );
        }
    } catch {
        // Next.js throws error when attempting to set cookies when rendering page
    }
    return {
        user,
        session,
    };
});

// ! IMPORTANT!
declare module "lucia" {
    interface Register {
        Lucia: typeof lucia;
        DatabaseUserAttributes: {
            id: string;
            email: string;
            username: string;
            image: string;
            role: "user" | "admin";
        };
    }
}
