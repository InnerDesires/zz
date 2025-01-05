'use client'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Link from 'next/link';
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useTranslations } from 'next-intl';

export default function ResetPassword() {
    const [email, setEmail] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const { data: session } = useSession();
    const t = useTranslations('RequestReset');

    if (session) {
        redirect("/");
    }

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/auth/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                setIsSubmitted(true);
            } else {
                console.error('Password reset request failed');
            }
        } catch (error) {
            console.error('Reset password error:', error);
        }
    };

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle>{t('title')}</CardTitle>
                <CardDescription>{t('description')}</CardDescription>
            </CardHeader>
            <CardContent>
                {!isSubmitted ? (
                    <form onSubmit={handleResetPassword} className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                {t('email')}
                            </label>
                            <Input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="mt-1 block w-full"
                                placeholder={t('emailPlaceholder')}
                            />
                        </div>
                        <Button type="submit" className="w-full">
                            {t('submit')}
                        </Button>
                    </form>
                ) : (
                    <div className="text-center space-y-4">
                        <p className="text-green-600">
                            {t('successMessage')}
                        </p>
                        <p className="text-sm text-gray-500">
                            {t('noEmail')}{" "}
                            <button
                                onClick={() => setIsSubmitted(false)}
                                className="text-blue-500 hover:underline"
                            >
                                {t('tryAgain')}
                            </button>
                        </p>
                    </div>
                )}
            </CardContent>
            <CardFooter>
                <p className="w-full text-sm text-center text-gray-500">
                    {t('rememberPassword')}{" "}
                    <Link href="/login" className="text-blue-500 hover:underline">
                        {t('signIn')}
                    </Link>
                </p>
            </CardFooter>
        </Card>
    );
}