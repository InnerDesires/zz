import { db } from "@/database/database";
import { createHash, randomBytes } from "crypto";
import { NextResponse } from "next/server";
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Token expiration time (1 hour)
const TOKEN_EXPIRATION = 60 * 60 * 1000;

export async function POST(req: Request) {
    try {
        const { email } = await req.json();

        // Find the user first
        const user = await db
            .selectFrom('User')
            .select(['id'])
            .where('email', '=', email)
            .executeTakeFirst();

        // Generate token even if user not found (for security)
        const resetToken = randomBytes(32).toString('hex');
        const hashedToken = createHash('sha256')
            .update(resetToken)
            .digest('hex');

        // If user exists, save the token
        if (user) {
            // Delete any existing tokens for this user
            await db
                .deleteFrom('PasswordResetToken')
                .where('user_id', '=', user.id)
                .execute();

            // Create new token
            await db
                .insertInto('PasswordResetToken')
                .values({
                    token: hashedToken,
                    user_id: user.id,
                    expires_at: new Date(Date.now() + TOKEN_EXPIRATION)
                })
                .execute();
        }

        // Create reset URL
        const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password/${resetToken}`;

        // Send email
        await resend.emails.send({
            from: 'Залізна Зміна <noreply@resend.dev>',
            to: email,
            subject: 'Скидання паролю',
            html: `
                <h2>Скидання паролю</h2>
                <p>Ви запросили скидання паролю. Натисніть на посилання нижче, щоб встановити новий пароль:</p>
                <a href="${resetUrl}">Скинути пароль</a>
                <p>Це посилання дійсне протягом 1 години.</p>
                <p>Якщо ви не запитували скидання паролю, проігноруйте цей лист.</p>
            `
        });

        return NextResponse.json({
            message: "Якщо вказана адреса існує в нашій системі, ви отримаєте email з інструкціями щодо скидання паролю."
        });

    } catch (error) {
        console.error('Password reset error:', error);
        return NextResponse.json(
            { error: "Помилка при обробці запиту на скидання паролю" },
            { status: 500 }
        );
    }
} 