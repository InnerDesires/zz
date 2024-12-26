import { NextResponse } from "next/server"
import { hash } from "bcryptjs"
import { db } from "@/database/database"

export async function POST(req: Request) {
    try {
        const { email, password }: { email: string, password: string } = await req.json()

        // Check if user exists
        const existingUser = await db.selectFrom('User').where('email', '=', email).selectAll().executeTakeFirst()

        if (existingUser) {
            return NextResponse.json(
                { message: "Користувач з такою поштою вже існує" },
                { status: 400 }
            )
        }

        // Hash password
        const hashedPassword = await hash(password, 10)

        // Create user
        const user = await db.insertInto('User').values({
            id: crypto.randomUUID(),
            email: email,
            hashed_password: hashedPassword
        }).returningAll().executeTakeFirstOrThrow()
        console.log('Created user:', user);

        return NextResponse.json(
            { message: "Користувач успішно створений" },
            { status: 201 }
        )
    } catch (error: unknown) {
        return NextResponse.json(
            { message: "Щось пішло не так", error: error },
            { status: 500 },
        )
    }
} 