'use client'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Facebook, Instagram } from 'lucide-react';
import { Icons } from "@/components/icons";
import Link from 'next/link';
import { signIn, useSession } from "next-auth/react"
import { redirect } from "next/navigation";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { data: session } = useSession();
    if (session) {
        redirect("/");
    }

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const result = await signIn('credentials', {
                email,
                password,
                redirect: true,
                callbackUrl: '/',
            });
            
            console.log('Sign in result:', result);
            
            if (result?.error) {
                console.error('Login failed:', result.error);
            } 

        } catch (error) {
            console.error('Login error:', error);
        }
    };

    const handleOAuthLogin = async (provider: string) => {
        if (provider === 'Google') {
            try {
                await signIn('google', {
                    callbackUrl: '/',  // Redirect after successful login
                });
            } catch (error) {
                console.error('OAuth error:', error);
            }
        } else {
            // Handle other providers
            console.log(`Logging in with ${provider}`);
        }
    };

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle>Авторизація</CardTitle>
                <CardDescription>Вітаємо на платформі для навчання та взаємодії учасників проекту Залізна Зміна</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="mb-4 space-y-2">
                    <Button
                        onClick={() => handleOAuthLogin('Google')}
                        className="w-full bg-[#EA4335] text-white hover:bg-[#EA4335]/80"
                    >

                        Продовжити через Google
                        <Icons.google />
                    </Button>
                    <Button
                        onClick={() => handleOAuthLogin('Facebook')}
                        className="w-full bg-[#3b5998] text-white hover:bg-[#3b5998]/80"
                    >

                        Продовжити через Facebook
                        <Facebook />
                    </Button>
                    <Button
                        onClick={() => handleOAuthLogin('Instagram')}
                        className="w-full bg-[#C13584] text-white hover:bg-[#833AB4]/80"
                    >

                        Продовжити через Instagram
                        <Instagram />
                    </Button>
                </div>

                <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">
                            Або продовжити через email
                        </span>
                    </div>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="mt-1 block w-full"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Пароль
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
                    <p className="text-sm text-gray-500">
                        Забули пароль?
                        <Link href="/reset-password" className="text-blue-500"> Скинути пароль</Link>
                    </p>
                    <Button type="submit" className="w-full">
                        Авторизуватися
                    </Button>
                </form>

            </CardContent>
            <CardFooter>
                <p className="w-full text-sm text-center text-gray-500"><Link href="/register" className="text-blue-500">Реєстрація через email та пароль</Link></p>
            </CardFooter>
        </Card>
    );
}