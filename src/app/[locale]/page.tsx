import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function HomePage() {
    const t = useTranslations('Home');
    return (
        <div className='flex flex-col items-center justify-center h-screen'>
            <h1>{t('title')}</h1>
            <Link href="/about">{t('description')}</Link>
        </div>
    );
}