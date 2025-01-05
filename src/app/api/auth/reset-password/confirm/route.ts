import { db } from "@/database/database";
import { createHash } from "crypto";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
    try {
        const { token, password } = await req.json();
        const hashedToken = createHash('sha256')
            .update(token)
            .digest('hex');

        // Find valid token and associated user
        const tokenRecord = await db
            .selectFrom('PasswordResetToken')
            .innerJoin('User', 'User.id', 'PasswordResetToken.user_id')
            .select('PasswordResetToken.user_id')
            .where('PasswordResetToken.token', '=', hashedToken)
            .where('PasswordResetToken.expires_at', '>', new Date())
            .executeTakeFirst();

        if (!tokenRecord) {
            return NextResponse.json(
                { error: "Недійсне або застаріле посилання для скидання паролю" },
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Update password and delete the used token
        await db.transaction().execute(async (trx) => {
            // Update password
            await trx
                .updateTable('User')
                .set({ hashed_password: hashedPassword })
                .where('id', '=', tokenRecord.user_id)
                .execute();

            // Delete the used token
            await trx
                .deleteFrom('PasswordResetToken')
                .where('user_id', '=', tokenRecord.user_id)
                .execute();
        });

        return NextResponse.json({
            message: "Пароль успішно оновлено"
        });

    } catch (error) {
        console.error('Password reset confirmation error:', error);
        return NextResponse.json(
            { error: "Помилка при оновленні паролю" },
            { status: 500 }
        );
    }
} 