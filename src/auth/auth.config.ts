import Google from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { db } from "@/database/database";
import { compare } from "bcryptjs";

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    providers: [
        Google,
        Credentials({
            name: 'credentials',
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Введіть email та пароль")
                }
                const user = await db.selectFrom('User')
                    .where('email', '=', credentials.email)
                    .selectAll()
                    .executeTakeFirst()
                console.log('User: ', user);
                if (!user || !user.hashed_password) {
                    throw new Error("Користувача не знайдено")
                }

                const isPasswordValid = await compare(credentials.password as string, user.hashed_password)
                console.log('Password validation result: ', isPasswordValid)
                if (isPasswordValid) {
                    return user;
                }
                throw new Error("Невірний пароль")
            }
        }),
    ],
} satisfies NextAuthConfig;
