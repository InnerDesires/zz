'use client'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Link from 'next/link';
import { useRouter } from "next/navigation";

export default function ResetPasswordConfirm({
    params
}: {
    params: { token: string }
}) {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            setError("Паролі не співпадають");
            return;
        }

        try {
            const response = await fetch('/api/auth/reset-password/confirm', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token: params.token,
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
                setError(data.error || "Помилка при скиданні паролю");
            }
        } catch (error) {
            console.error('Reset password error:', error);
        }
    };

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle>Встановіть новий пароль</CardTitle>
                <CardDescription>
                    Будь ласка, введіть новий пароль
                </CardDescription>
            </CardHeader>
            <CardContent>
                {!isSubmitted ? (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Новий пароль
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
                                Підтвердіть пароль
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
                            <p className="text-red-500 text-sm">{error}</p>
                        )}
                        <Button type="submit" className="w-full">
                            Зберегти новий пароль
                        </Button>
                    </form>
                ) : (
                    <div className="text-center space-y-4">
                        <p className="text-green-600">
                            Пароль успішно змінено! Зараз вас буде перенаправлено на сторінку входу.
                        </p>
                    </div>
                )}
            </CardContent>
            <CardFooter>
                <p className="w-full text-sm text-center text-gray-500">
                    <Link href="/login" className="text-blue-500 hover:underline">
                        Повернутися до входу
                    </Link>
                </p>
            </CardFooter>
        </Card>
    );
} 