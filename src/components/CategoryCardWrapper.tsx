'use client';

import { Link } from "@/i18n/routing";

interface CategoryCardWrapperProps {
    href: string;
    children: React.ReactNode;
}

export default function CategoryCardWrapper({ href, children }: CategoryCardWrapperProps) {
    return (
        <Link href={href} className="block w-full">
            {children}
        </Link>
    );
} 