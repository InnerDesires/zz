"use client"

import { Link } from '@/i18n/routing'
import { useTranslations } from "next-intl"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
    NavigationMenuLink,
} from "@/components/ui/navigation-menu"

import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import NavbarMobile from "./NavbarMobile"
import { ModeToggle } from "../common/ModeToggle"
import ProfileAvatarHandler from "./ProfileAvatarHandler"
import LanguageSwitcher from "../LanguageSwitcher"

export default function Navbar() {
    return (
        <NavigationMenu className='p-3 min-w-full justify-between'>
            <div className="w-full flex justify-between items-center">
                <NavigationMenuList>
                    <NavbarMobile />
                    <DesktopMenu />
                </NavigationMenuList>
                <div className="flex items-center gap-2">
                    <LanguageSwitcher />
                    <ModeToggle />
                    <ProfileAvatarHandler />
                </div>
            </div>
        </NavigationMenu>
    )
}

function DesktopMenu() {
    const t = useTranslations('Navbar')
    
    return (
        <>
            <NavigationMenuItem>
                <Link href="/" className="block w-16 p-1">
                    <Logo />
                </Link>
            </NavigationMenuItem>

            {/* Learn Section */}
            <NavigationMenuItem className="hidden md:block">
                <NavigationMenuTrigger>{t('button1')}</NavigationMenuTrigger>
                <NavigationMenuContent>
                    <div className="grid w-[500px] gap-3 p-4 lg:w-[600px] lg:grid-cols-[.75fr_1fr]">
                        <Card className="row-span-3">
                            <CardContent className="p-0 h-full">
                                <NavigationMenuLink asChild>
                                    <Link 
                                        href="/courses"
                                        className="flex h-full flex-col justify-end rounded-md bg-[url('/kids.jpg')] bg-cover bg-center p-6 no-underline outline-none focus:shadow-md relative"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black rounded-md" />
                                        <div className="relative z-10">
                                            <h3 className="mb-2 mt-4 text-lg font-medium text-white">
                                                {t('block1Header')}
                                            </h3>
                                            <p className="text-sm leading-tight text-white/90">
                                                {t('block1HeaderDescription')}
                                            </p>
                                        </div>
                                    </Link>
                                </NavigationMenuLink>
                            </CardContent>
                        </Card>
                        
                        <NavigationLink 
                            href="/courses#categories"
                            title={t('block1item1')}
                            description={t('block1item1description')}
                        />
                        <NavigationLink 
                            href="/courses#new-courses"
                            title={t('block1item2')}
                            description={t('block1item2description')}
                        />
                        <NavigationLink 
                            href="/courses#popular-courses"
                            title={t('block1item3')}
                            description={t('block1item3description')}
                        />
                    </div>
                </NavigationMenuContent>
            </NavigationMenuItem>

            {/* News Section */}
            <NavigationMenuItem className="hidden md:block">
                <NavigationMenuTrigger>{t('button2')}</NavigationMenuTrigger>
                <NavigationMenuContent>
                    <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                        <NavigationLink 
                            href="/news"
                            title={t('block2item1')}
                            description={t('block2item1description')}
                        />
                        <NavigationLink 
                            href="/events"
                            title={t('block2item2')}
                            description={t('block2item2description')}
                        />
                        <NavigationLink 
                            href="/other"
                            title={t('block2item3')}
                            description={t('block2item3description')}
                        />
                    </div>
                </NavigationMenuContent>
            </NavigationMenuItem>

            {/* About Section */}
            <NavigationMenuItem className="hidden md:block">
                <Link href="/about" className={navigationMenuTriggerStyle()}>
                    {t('button3')}
                </Link>
            </NavigationMenuItem>
        </>
    )
}

interface NavigationLinkProps {
    href: string
    title: string
    description: string
}

function NavigationLink({ href, title, description }: NavigationLinkProps) {
    return (
        <NavigationMenuLink asChild>
            <Link 
                href={href}
                className={cn(
                    "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none",
                    "transition-colors hover:bg-accent hover:text-accent-foreground",
                    "focus:bg-accent focus:text-accent-foreground"
                )}
            >
                <div className="text-sm font-medium leading-none">{title}</div>
                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    {description}
                </p>
            </Link>
        </NavigationMenuLink>
    )
}

function Logo() {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 67 24"
            aria-label="Укрзалізниця"
        >
            <path 
                fill="currentColor" 
                d="M25.926 5.956c1.946 0 2.894.752 2.894 1.774s-.955 1.774-2.894 1.774h-1.924l-2.394 5.014h4.636c2.084 0 2.97.722 2.97 1.737s-.886 1.741-2.97 1.741H19.93L17.036 24h8.525c6.68 0 10.004-2.89 10.004-6.672a6.55 6.55 0 0 0-3.136-5.765c1.769-1.17 2.923-2.89 2.923-4.928 0-4.103-3.552-6.632-9.187-6.632h-8.529l-5.425 11.343L6.8.003H0l8.738 18.503L6.148 24h6.692l8.637-18.044zM37.794 10.23h22.704L57.85 4.64A8.92 8.92 0 0 0 49.944 0h-13.72a9.13 9.13 0 0 1 2.478 6.257 9.5 9.5 0 0 1-.908 3.974M37.978 13.767a8.94 8.94 0 0 1 .911 3.974 8.23 8.23 0 0 1-2.673 6.256H67l-4.829-10.23z"
            />
        </svg>
    )
}