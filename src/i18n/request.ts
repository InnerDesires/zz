import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';
import { fetchTranslations } from '@/services/translations';

export default getRequestConfig(async ({ requestLocale }) => {
    // This typically corresponds to the `[locale]` segment
    let locale = await requestLocale;

    // Ensure that a valid locale is used
    if (!locale || !routing.locales.includes(locale as 'uk-UA' | 'en')) {
        locale = routing.defaultLocale;
    }

    const messages = await fetchTranslations(locale);

    return {
        locale,
        messages
    };
});

