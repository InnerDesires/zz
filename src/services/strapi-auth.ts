import axios from 'axios';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

interface LoginResponse {
    jwt: string;
    user: {
        id: number;
        username: string;
        email: string;
    };
}

export const strapiAuth = {
    async login(identifier: string, password: string): Promise<LoginResponse> {
        try {
            const response = await axios.post(`${STRAPI_URL}/api/auth/local`, {
                identifier,
                password,
            });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.error?.message || 'Login failed');
            }
            throw error;
        }
    },

    async register(email: string, password: string, username?: string): Promise<LoginResponse> {
        try {
            const response = await axios.post(`${STRAPI_URL}/api/auth/local/register`, {
                username: username || email,
                email,
                password,
            });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.error?.message || 'Registration failed');
            }
            throw error;
        }
    },

    async forgotPassword(email: string): Promise<void> {
        try {
            await axios.post(`${STRAPI_URL}/api/auth/forgot-password`, {
                email,
            });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.error?.message || 'Password reset request failed');
            }
            throw error;
        }
    },

    async resetPassword(code: string, password: string, passwordConfirmation: string): Promise<void> {
        try {
            await axios.post(`${STRAPI_URL}/api/auth/reset-password`, {
                code,
                password,
                passwordConfirmation,
            });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.error?.message || 'Password reset failed');
            }
            throw error;
        }
    },
}; 