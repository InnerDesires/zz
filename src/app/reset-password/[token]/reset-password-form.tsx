'use client'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { useTranslations } from 'next-intl';

interface ResetPasswordFormProps {
    token: string;
}

export default function ResetPasswordForm({ token }: ResetPasswordFormProps) {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const router = useRouter();
    const t = useTranslations('ResetPassword');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            setError("passwordMismatch");
            return;
        }

        try {
            const response = await fetch('/api/auth/reset-password/confirm', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token,
                    password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setIsSubmitted(true);
                setTimeout(() => {
                    router.push('/login');
                }, 3000);
            } else {
                setError(data.error || "generic");
            }
        } catch (error) {
            console.error('Reset password error:', error);
            setError("generic");
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
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                {t('newPassword')}
                            </label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="mt-1 block w-full"
                            />
                        </div>
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                {t('confirmPassword')}
                            </label>
                            <Input
                                id="confirmPassword"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                className="mt-1 block w-full"
                            />
                        </div>
                        {error && (
                            <p className="text-red-500 text-sm">{t(`errors.${error}`)}</p>
                        )}
                        <Button type="submit" className="w-full">
                            {t('submit')}
                        </Button>
                    </form>
                ) : (
                    <div className="text-center space-y-4">
                        <p className="text-green-600">
                            {t('success')}
                        </p>
                    </div>
                )}
            </CardContent>
            <CardFooter>
                <p className="w-full text-sm text-center text-gray-500">
                    <Link href="/login" className="text-blue-500 hover:underline">
                        {t('backToLogin')}
                    </Link>
                </p>
            </CardFooter>
        </Card>
    );
}  