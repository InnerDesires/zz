import NextAuth from "next-auth";
import { KyselyAdapter } from "@auth/kysely-adapter";
import { db } from "@/database/database";
import {authConfig} from "./auth.config";
import { Database } from '@auth/kysely-adapter'
import { Kysely } from 'kysely'

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: KyselyAdapter(db as unknown as Kysely<Database>),
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  secret: process.env.AUTH_SECRET,
  debug: true,  
  ...authConfig,
});
