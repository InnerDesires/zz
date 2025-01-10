import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import BaseLayout from '@/components/BaseLayout';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Iron Squad',
    description: 'Iron Squad - Learning Platform',
};

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    if (!routing.locales.includes(locale as 'uk-UA' | 'en')) {
        notFound();
    }

    return <BaseLayout locale={locale}>{children}</BaseLayout>;
}