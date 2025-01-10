export const locales = ['en', 'uk-UA'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'uk-UA';

export const localeLabels: Record<Locale, string> = {
  'en': 'English',
  'uk-UA': 'Українська',
};