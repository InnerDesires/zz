import { Kysely, sql } from "kysely";
import { Database } from "@/types/db_types";

export async function up(db: Kysely<Database>): Promise<void> {
  await db.schema
    .createTable("User")
    .ifNotExists() // Add this line
    .addColumn("id", "uuid", (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`)
    )
    .addColumn("name", "text")
    .addColumn("email", "text", (col) => col.unique().notNull())
    .addColumn("emailVerified", "timestamptz")
    .addColumn("image", "text")
    .addColumn("hashed_password", "text")
    .execute();

  await db.schema
    .createTable("Account")
    .ifNotExists() // Add this line
    .addColumn("id", "uuid", (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`)
    )
    .addColumn("userId", "uuid", (col) =>
      col.references("User.id").onDelete("cascade").notNull())
    .addColumn("type", "text", (col) => col.notNull())
    .addColumn("provider", "text", (col) => col.notNull())
    .addColumn("providerAccountId", "text", (col) => col.notNull())
    .addColumn("refresh_token", "text")
    .addColumn("access_token", "text")
    .addColumn("expires_at", "bigint")
    .addColumn("token_type", "text")
    .addColumn("scope", "text")
    .addColumn("id_token", "text")
    .addColumn("session_state", "text")
    .execute();

  await db.schema
    .createTable("Session")
    .ifNotExists() // Add this line
    .addColumn("id", "uuid", (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`)
    )
    .addColumn("userId", "uuid", (col) =>
      col.references("User.id").onDelete("cascade").notNull())
    .addColumn("sessionToken", "text", (col) => col.notNull().unique())
    .addColumn("expires", "timestamptz", (col) => col.notNull())
    .execute();

  await db.schema
    .createTable("VerificationToken")
    .ifNotExists() // Add this line
    .addColumn("identifier", "text", (col) => col.notNull())
    .addColumn("token", "text", (col) => col.notNull().unique())
    .addColumn("expires", "timestamptz", (col) => col.notNull())
    .execute();

  await db.schema
    .createIndex("Account_userId_index")
    .ifNotExists() // Add this line
    .on("Account")
    .column("userId")
    .execute();

  await db.schema
    .createIndex("Session_userId_index")
    .ifNotExists() // Add this line
    .on("Session")
    .column("userId")
    .execute();
}

export async function down(db: Kysely<Database>): Promise<void> {
  await db.schema.dropTable("Account").ifExists().execute();
  await db.schema.dropTable("Session").ifExists().execute();
  await db.schema.dropTable("User").ifExists().execute();
  await db.schema.dropTable("VerificationToken").ifExists().execute();
}
