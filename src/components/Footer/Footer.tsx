import { useTranslations } from 'next-intl';

export default function Footer() {
    const t = useTranslations('Footer');
    return (
        <footer className="text-center py-4 text-muted-foreground">
            <p>Всеукраїнський унікальний соціальний проєкт спортивно-патріотичного виховання дітей та молоді
            ЗАЛІЗНА ЗМІНА</p>
            <p>&copy; {new Date().getFullYear()} {t('footer')}</p>
        </footer>
    );
}