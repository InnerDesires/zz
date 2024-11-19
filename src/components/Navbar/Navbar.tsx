"use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

import components from "./constants";
import NavbarMobile from "./NavbarMobile"
import { Button } from "../ui/button"
import { usePathname } from "next/navigation"
import { ModeToggle } from "../common/ModeToggle"

export default function Navbar() {
    const pathname = usePathname();
    console.log(pathname)
    return (
        <NavigationMenu className='p-3 min-w-full justify-between'>
            <NavigationMenuList>

                <NavbarMobile />
                <DesktopMenu />

            </NavigationMenuList>
            <div className="flex items-center">
                <ModeToggle />
                {pathname !== "/login" ? <Link href="/login"><Button variant="outline">Увійти</Button></Link> : <Link href="/register"><Button variant="outline">Зареєструватися</Button></Link>}
            </div>
        </NavigationMenu>
    );
}

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <Link
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </Link>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"

function DesktopMenu() {
    return <>
        <NavigationMenuItem >
            <div className="block w-16 p-1"><Link href="/" aria-label="Укрзалізниця"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 67 24"><path fill="currentColor" d="M25.926 5.956c1.946 0 2.894.752 2.894 1.774s-.955 1.774-2.894 1.774h-1.924l-2.394 5.014h4.636c2.084 0 2.97.722 2.97 1.737s-.886 1.741-2.97 1.741H19.93L17.036 24h8.525c6.68 0 10.004-2.89 10.004-6.672a6.55 6.55 0 0 0-3.136-5.765c1.769-1.17 2.923-2.89 2.923-4.928 0-4.103-3.552-6.632-9.187-6.632h-8.529l-5.425 11.343L6.8.003H0l8.738 18.503L6.148 24h6.692l8.637-18.044zM37.794 10.23h22.704L57.85 4.64A8.92 8.92 0 0 0 49.944 0h-13.72a9.13 9.13 0 0 1 2.478 6.257 9.5 9.5 0 0 1-.908 3.974M37.978 13.767a8.94 8.94 0 0 1 .911 3.974 8.23 8.23 0 0 1-2.673 6.256H67l-4.829-10.23z"></path></svg></Link></div>
        </NavigationMenuItem>
        <NavigationMenuItem className="hidden md:block">
            <NavigationMenuTrigger>Розвивайся</NavigationMenuTrigger>
            <NavigationMenuContent>
                <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">

                    <li className="row-span-3">
                        <NavigationMenuLink asChild>
                            <Link
                                className="flex h-full w-full select-none flex-col justify-end rounded-md bg-[url('/kids.jpg')] bg-cover bg-center p-6 no-underline outline-none focus:shadow-md relative"
                                href="/"
                            >
                                <div className="absolute inset-0 bg-gradient-to-b to-black from-transparent rounded-md"></div>
                                <div className="relative z-10">
                                    <div className="mb-2 mt-4 text-lg font-medium text-white">
                                        Навчальна платформа Залізної Зміни
                                    </div>
                                    <p className="text-sm leading-tight text-white">
                                        Найкращі навчальні матеріали для вашого розвитку
                                    </p>
                                </div>
                            </Link>
                        </NavigationMenuLink>
                    </li>
                    {components[0].children.map((child) => (
                        <ListItem key={child.title} href={child.href} title={child.title}>
                            {child.description}
                        </ListItem>
                    ))}
                </ul>
            </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem className="hidden md:block">
            <NavigationMenuTrigger>Будь в курсі</NavigationMenuTrigger>
            <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                    {components[1].children.map((child) => (
                        <ListItem
                            key={child.title}
                            title={child.title}
                            href={child.href}
                        >
                            {child.description}
                        </ListItem>
                    ))}
                </ul>
            </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem className="hidden md:block">
            <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Дізнайся про нас більше
                </NavigationMenuLink>
            </Link>
        </NavigationMenuItem>
    </>
}