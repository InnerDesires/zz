export type Locale = (typeof locales)[number];

export const locales = ['en', 'uk-UA'] as const;
export const defaultLocale: Locale = 'uk-UA';