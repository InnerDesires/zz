'use client';

import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";

export default function ProfilePage() {
    const { user, logout } = useAuth();

    if (!user) {
        return (
            <div className="container mx-auto py-8">
                <p>Please log in to view your profile.</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-8 space-y-12">
            <p className="text-4xl font-bold">Profile</p>
            <div className="flex flex-col gap-4">
                <span>Email: {user.email}</span>
                <Button 
                    variant="destructive" 
                    className="w-fit" 
                    onClick={() => logout()}
                >
                    Logout
                </Button>
            </div>
        </div>
    );
}
