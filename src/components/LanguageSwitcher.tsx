'use client'

import clsx from 'clsx';
import { useParams } from 'next/navigation';
import { useMemo, useTransition } from 'react';
import { usePathname, useRouter } from '@/i18n/routing';
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Languages } from "lucide-react"
import { Locale } from '@/i18n/config';
import { useLocale } from 'next-intl';

const locales = {
    'en': 'English',
    'uk-UA': 'Українська'
} as const;

export default function LanguageSwitcher() {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const pathname = usePathname();
    const params = useParams();
    const currentLocale = useLocale();

    const onSelectChange = useMemo(() => (nextLocale: Locale) => {
        startTransition(() => {
            router.replace(
                // @ts-expect-error -- TypeScript will validate that only known `params`
                // are used in combination with a given `pathname`. Since the two will
                // always match for the current route, we can skip runtime checks.
                { pathname, params },
                { locale: nextLocale }
            );
        });
    }, [router, pathname, params]);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button 
                    variant="ghost" 
                    size="icon"
                    className={clsx(
                        'hover:bg-accent hover:text-accent-foreground',
                        isPending && 'transition-opacity [&:disabled]:opacity-30'
                    )}
                    disabled={isPending}
                >
                    <Languages className="h-[1.2rem] w-[1.2rem]" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {Object.entries(locales).map(([locale, label]) => (
                    <DropdownMenuItem
                        key={locale}
                        onClick={() => onSelectChange(locale as Locale)}
                        className={clsx(
                            'cursor-pointer',
                            currentLocale === locale && 'bg-accent'
                        )}
                    >
                        {label}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
} 