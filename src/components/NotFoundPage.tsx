import { useTranslations } from 'next-intl';
import Link from 'next/link';
export default function NotFoundPage() {
    const t = useTranslations('NotFound');
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold">{t('title')}</h1>
            <p className="text-lg text-gray-500">{t('description')}</p>
            <Link href="/">{t('home')}</Link>
        </div>
    );
}