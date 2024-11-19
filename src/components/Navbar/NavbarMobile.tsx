import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import components from "./constants";
import { NavigationMenuItem } from "@radix-ui/react-navigation-menu";
import Link from "next/link";


export default function NavbarMobile() {
    return (
        <NavigationMenuItem className="block md:hidden">
            <Drawer>
                <DrawerTrigger className="align-middle"> <MenuIcon /> </DrawerTrigger>
                <DrawerContent>
                    <DrawerHeader >
                        <VisuallyHidden.Root asChild>
                            <DrawerTitle>Навігація</DrawerTitle>
                        </VisuallyHidden.Root>
                    </DrawerHeader>
                    <div>
                        <ul className="space-y-2 p-4">
                            {components.map((component) => (
                                <div key={component.title}>
                                    <h3 className="font-bold">{component.title}</h3>
                                    {component.children.map((child) => (
                                        <li key={child.title}>
                                            <Link
                                                href={child.href}
                                                className="block p-3 rounded-md hover:bg-gray-200"
                                            >
                                                {child.title}
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