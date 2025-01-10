'use client'
import { Link } from '@/i18n/routing';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../ui/popover"
import { useAuth } from '@/contexts/auth-context';
import { useParams } from 'next/navigation';


export default function ProfileAvatarHandler() {
    const { user, logout } = useAuth();
    const pathname = usePathname();
    const t = useTranslations('Auth');
    const params = useParams();
    const locale = params.locale as string;

    if (!user && pathname !== `/${locale}/login`) return <LoginButton />;
    if (!user && pathname === `/${locale}/login`) return <RegisterButton />;

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Avatar className='cursor-pointer ml-2'>
                    <AvatarImage src={user?.image || undefined} />
                    <AvatarFallback>
                        {user?.email?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                </Avatar>
            </PopoverTrigger>
            <PopoverContent>
                <div className="flex flex-col gap-2">
                    <Link href={`/profile`} className="hover:bg-muted px-3 py-2 rounded-md">
                        {t('profile')}
                    </Link>
                    <Button
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={logout}
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
    return <Link href={`/login`}><Button variant="outline">{t('signIn')}</Button></Link>;
}

const RegisterButton = () => {
    const t = useTranslations('Auth');
    return <Link href={`/register`}><Button variant="outline">{t('register')}</Button></Link>;
}