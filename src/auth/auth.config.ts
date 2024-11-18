import Google from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";
import { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
class InvalidLoginError extends CredentialsSignin {
    code = "Invalid identifier or password"
}

export default {
    providers: [
        Google,
        Credentials({
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
        }),
    ],
} satisfies NextAuthConfig;
