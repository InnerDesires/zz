
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { ReactNode } from 'react';
import { AuthProvider } from '@/contexts/auth-context';
import { ThemeProvider } from './common/theme-provider';
import Navbar from '@/components/Navbar/Navbar';

import '@/app/globals.css'
import Footer from '@/components/Footer/Footer';

type Props = {
    children: ReactNode;
    locale: string;
};

export default async function BaseLayout({ children, locale }: Props) {
    // Providing all messages to the client
    // side is the easiest way to get started
    const messages = await getMessages();


    return (
        <html lang={locale} suppressHydrationWarning>
            <body>
                <AuthProvider>
                    <NextIntlClientProvider messages={messages}>
                        <ThemeProvider
                            attribute="class"
                            defaultTheme="system"
                            enableSystem
                            disableTransitionOnChange
                        >
                            <Navbar />
                            {children}
                            <Footer />
                        </ThemeProvider>
                    </NextIntlClientProvider>
                </AuthProvider>
            </body>
        </html>
    );
}