'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

export default function ProfileAvatarHandler() {
    const { data: session } = useSession();
    const pathname = usePathname();

    if (!session && pathname !== "/login") return <LoginButton />
    if (!session && pathname == "/login") return <RegisterButton />

    return <Avatar className='cursor-pointer ml-2'>
        <AvatarImage src={session?.user?.image as string} />
        <AvatarFallback>
            {session?.user?.email?.charAt(0)}
        </AvatarFallback>
    </Avatar>;
}

const LoginButton = () => {
    return <Link href="/login"><Button variant="outline">Увійти</Button></Link>;
}

const RegisterButton = () => {
    return <Link href="/register"><Button variant="outline">Зареєструватися</Button></Link>;
}