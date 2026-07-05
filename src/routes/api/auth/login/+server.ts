// src/routes/api/auth/login/+server.ts
import { json } from '@sveltejs/kit';
import { login } from '$lib/server/auth';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, cookies }) => {
    const { email, password } = await request.json() as { email: string; password: string };
    
    try {
        const user = await login(email, password);
        if (!user) {
            return json({ message: 'Invalid credentials' }, { status: 401 });
        }
        
        cookies.set('session', JSON.stringify(user), {
            path: '/',
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7 // 7 days
        });
        
        return json({ success: true, user });
    } catch (error) {
        console.error('Login error:', error);
        return json({ message: 'An error occurred during login' }, { status: 500 });
    }
};