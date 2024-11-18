
import { Pool } from "pg";
import { PostgresDialect } from "kysely";
import { KyselyAuth } from "@auth/kysely-adapter";
import { up } from "./migrations/001_create_db";
import { Database } from "@/types/db_types";


const dialect = new PostgresDialect({
    pool: new Pool({
        database: "mydb",
        host: "localhost",
        user: "macsucks",
        password: process.env.DB_PASSWORD,
        port: 5432,
        max: 10,
    }),
});

export const db = new KyselyAuth<Database>({
    dialect,
});

up(db).then(() => {
    console.log("Database created");
});
