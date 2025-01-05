'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../ui/popover"

export default function ProfileAvatarHandler() {
    const { data: session } = useSession();
    const pathname = usePathname();
    const t = useTranslations('Auth');

    if (!session && pathname !== "/login") return <LoginButton />;
    if (!session && pathname == "/login") return <RegisterButton />;

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Avatar className='cursor-pointer ml-2'>
                    <AvatarImage src={session?.user?.image as string} />
                    <AvatarFallback>
                        {session?.user?.email?.charAt(0)}
                    </AvatarFallback>
                </Avatar>
            </PopoverTrigger>
            <PopoverContent>
                <div className="flex flex-col gap-2">
                    <Link href="/profile" className="hover:bg-muted px-3 py-2 rounded-md">
                        {t('profile')}
                    </Link>
                    <Button
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={() => signOut()}
                    >
                        {t('signOut')}
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    );
}

const LoginButton = () => {
    const t = useTranslations('Auth');
    return <Link href="/login"><Button variant="outline">{t('signIn')}</Button></Link>;
}

const RegisterButton = () => {
    const t = useTranslations('Auth');
    return <Link href="/register"><Button variant="outline">{t('register')}</Button></Link>;
}