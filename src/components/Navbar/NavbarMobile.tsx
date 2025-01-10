'use client'

import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { MenuIcon } from "lucide-react";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import components from "./constants";
import { NavigationMenuItem } from "@radix-ui/react-navigation-menu";
import Link from "next/link";
import { useTranslations } from "next-intl";


export default function NavbarMobile() {
    const t = useTranslations('Navbar');
    
    return (
        <NavigationMenuItem className="block md:hidden">
            <Drawer>
                <DrawerTrigger className="align-middle"> <MenuIcon /> </DrawerTrigger>
                <DrawerContent>
                    <DrawerHeader >
                        <VisuallyHidden.Root asChild>
                            <DrawerTitle>{t('button1')}</DrawerTitle>
                        </VisuallyHidden.Root>
                    </DrawerHeader>
                    <div>
                        <ul className="space-y-2 p-4">
                            {components.map((component) => (
                                <div key={component.title}>
                                    <h3 className="font-bold">{t(component.title)}</h3>
                                    {component.children.map((child) => (
                                        <li key={child.title}>
                                            <Link
                                                prefetch={true}
                                                href={child.href}
                                                className="block p-3 rounded-md hover:bg-gray-200"
                                            >
                                                {t(child.title)}
                                            </Link>
                                        </li>
                                    ))}
                                </div>
                            ))}
                        </ul>
                    </div>
                </DrawerContent>
            </Drawer>
        </NavigationMenuItem>
    );
}