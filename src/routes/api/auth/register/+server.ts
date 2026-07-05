// src/routes/api/auth/register/+server.ts
import { json } from '@sveltejs/kit';
import { register } from '$lib/server/auth';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
    const { email, password, firstname, lastname } = await request.json() as {
        email: string;
        password: string;
        firstname: string;
        lastname: string;
    };
    
    try {
        const user = await register(email, password, firstname, lastname);
        return json({ success: true, user });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Registration failed';
        return json({ message }, { status: 400 });
    }
};