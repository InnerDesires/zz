import { Pool } from "pg";
import { PostgresDialect } from "kysely";
import { KyselyAuth } from "@auth/kysely-adapter";
import { up } from "./migrations/001_create_db";
import { Database } from "@/types/db_types";


const dialect = new PostgresDialect({
    pool: new Pool({
        connectionString: process.env.NODE_ENV === "production" ? process.env.POSTGRESS_PRISMA_URL : process.env.POSTGRES_URL_WORKAROUND,
        ssl: {
            rejectUnauthorized: false // Required for Supabase connections
        },
        max: 10
    }),
});

export const db = new KyselyAuth<Database>({
    dialect,
});

up(db).then(() => {
    console.log("Database created");
});
