import axios from 'axios';
import path from 'path';

if (!process.env.NEXT_PUBLIC_STRAPI_URL) {
    throw new Error('NEXT_PUBLIC_STRAPI_URL is not set');
}
export const cmsAxiosInstance = axios.create({
    baseURL: path.join(process.env.NEXT_PUBLIC_STRAPI_URL, '/api'),
    headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_KEY}`,
    }
});