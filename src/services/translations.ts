import axios from 'axios';
import { unstable_cache } from 'next/cache';
import { AbstractIntlMessages } from 'next-intl';

interface TranslationResponse {
    data: {
        id: number;
        uk: AbstractIntlMessages;
        en: AbstractIntlMessages;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
    };
}

async function getTranslationsFromStrapi() {
    try {
        const response = await axios.get<TranslationResponse>(
            `http://127.0.0.1:1337/api/translation`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.STRAPI_API_KEY}`,
                }
            }
        );
        console.log(response.data);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Axios error:', error.response?.data || error.message);
        }
        throw new Error('Failed to fetch translations');
    }
}

// TODO: use another cache method, because unstable_cache is deprecated in Next.js 15
const getCachedTranslations = unstable_cache(
    async () => getTranslationsFromStrapi(),
    ['translations'],
    { revalidate: 3600, tags: ['translations'] }
);

export async function fetchTranslations(locale: string): Promise<AbstractIntlMessages> {
    let responseData;
    try {
        responseData = await getCachedTranslations();
    } catch (error) {
        throw new Error('Failed to fetch translations', { cause: error });
    }
    // Map 'uk-UA' to 'uk' for consistency with Strapi's response
    const localeKey = locale === 'uk-UA' ? 'uk' : locale;

    const messages = responseData.data[localeKey as keyof typeof responseData.data] as AbstractIntlMessages;
    if (!messages) {
        throw new Error(`No translations found for locale: ${locale}`);
    }

    return messages;

} 