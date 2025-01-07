'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { strapiAuth } from '@/services/strapi-auth';

interface User {
    id: number;
    username: string;
    email: string;
    image?: string | null;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string) => Promise<void>;
    logout: () => void;
    error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Check for stored token and user data
        const token = localStorage.getItem('jwt');
        const storedUser = localStorage.getItem('user');
        
        if (token && storedUser) {
            setUser(JSON.parse(storedUser));
        }
        
        setLoading(false);
    }, []);

    const login = async (email: string, password: string) => {
        try {
            setError(null);
            const response = await strapiAuth.login(email, password);
            localStorage.setItem('jwt', response.jwt);
            localStorage.setItem('user', JSON.stringify(response.user));
            setUser(response.user);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Login failed');
            throw err;
        }
    };

    const register = async (email: string, password: string) => {
        try {
            setError(null);
            const response = await strapiAuth.register(email, password);
            localStorage.setItem('jwt', response.jwt);
            localStorage.setItem('user', JSON.stringify(response.user));
            setUser(response.user);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Registration failed');
            throw err;
        }
    };

    const logout = () => {
        localStorage.removeItem('jwt');
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout, error }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
} 