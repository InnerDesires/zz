import { Pool } from "pg";
import { PostgresDialect } from "kysely";
import { KyselyAuth } from "@auth/kysely-adapter";
import { up } from "./migrations/001_create_db";
import { Database } from "@/types/db_types";

const connectionString = process.env.POSTGRES_URL
const dialect = new PostgresDialect({
    pool: new Pool({
        connectionString: connectionString,
        max: 10,
    }),
});

export const db = new KyselyAuth<Database>({
    dialect,
});

up(db).then(() => {
    console.log('db up')
});
