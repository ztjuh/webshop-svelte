// src/routes/api/auth/logout/+server.ts
import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ cookies }) => {
    cookies.delete('session', { path: '/' });
    return json({ success: true });
};