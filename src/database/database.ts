import { Client, Pool } from "pg";
import { PostgresDialect } from "kysely";
import { KyselyAuth } from "@auth/kysely-adapter";
import { up } from "./migrations/001_create_db";
import { Database } from "@/types/db_types";

const connectionString = process.env.NODE_ENV === "production"
    ? process.env.POSTGRES_PRISMA_URL
    : process.env.POSTGRES_URL_WORKAROUND
console.log('Connection String:', connectionString)
const dialect = new PostgresDialect({
    pool: new Pool({
        connectionString: connectionString,
        ssl: {
            rejectUnauthorized: false, // Allows self-signed certificates
        },
        max: 10,
    }),
});

(async () => {
    const client = new Client({
        connectionString: connectionString,
        ssl: { rejectUnauthorized: false },
    });

    try {
        console.log("Attempting to connect...");
        await client.connect();
        console.log("Connected successfully!");
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Connection failed:", error.message);
            console.error("Error type:", error.name); // Logs specific error type (e.g., ECONNREFUSED)
        } else {
            console.error("Unknown error occurred:", error);
        }
    } finally {
        console.error("jumped to finally");
        await client.end();
    }
})();

export const db = new KyselyAuth<Database>({
    dialect,
});

up(db).then(() => {
    console.log("Database created");
});
