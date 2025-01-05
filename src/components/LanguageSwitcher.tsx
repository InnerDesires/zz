'use client'
import { useLocale } from 'next-intl';

import { Button } from "@/components/ui/button";
import { setUserLocale } from '@/services/locale';

export default function LanguageSwitcher() {
    const locale = useLocale();



    return (
        <Button
            variant="outline"
            onClick={() => setUserLocale(locale === 'uk-UA' ? 'en' : 'uk-UA')}
            className="w-8 px-0 mr-1"
        >
            {locale === 'uk-UA' ? 'EN' : 'UA'}
        </Button>
    );
} 