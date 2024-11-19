import NextAuth from "next-auth";
import { KyselyAdapter } from "@auth/kysely-adapter";
import { db } from "@/database/database";
import authConfig from "./auth.config";
import { Database } from '@auth/kysely-adapter'
import { Kysely } from 'kysely'

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: KyselyAdapter(db as unknown as Kysely<Database>),
  session: {
    strategy: "database",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  cookies: {
    sessionToken: {
      name: 'next-auth.session-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production'
      }
    }
  },
  callbacks: {
    async session({ session, user }) {
      session.user.id = user.id;
      return session;
    },
  },
  ...authConfig,
});
