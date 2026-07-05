// src/routes/api/products/+server.ts
import { json } from '@sveltejs/kit';
import { getProducts } from '$lib/server/database';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
    try {
        const products = await getProducts();
        
        // ✅ Ensure we always return an array
        if (!Array.isArray(products)) {
            console.error('getProducts returned non-array:', products);
            return json([], { status: 500 });
        }
        
        return json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        // ✅ Return empty array on error
        return json([], { status: 500 });
    }
};