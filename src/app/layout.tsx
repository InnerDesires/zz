import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import { ThemeProvider } from "@/components/common/theme-provider";
import { SessionProvider } from "next-auth/react"
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';


export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className='mx-2'>
        <SessionProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <NextIntlClientProvider messages={messages}>
              <Navbar />
              {children}
            </NextIntlClientProvider>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
