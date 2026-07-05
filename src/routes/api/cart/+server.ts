// src/routes/api/cart/+server.ts
import { json } from '@sveltejs/kit';
import { getProductById } from '$lib/server/database';
import type { RequestHandler } from './$types';
import type { CartItem } from '$lib/types';

// GET cart
export const GET: RequestHandler = async ({ cookies }) => {
    const cart = JSON.parse(cookies.get('cart') || '[]') as CartItem[];
    return json(cart);
};

// POST add item
export const POST: RequestHandler = async ({ request, cookies }) => {
    const { productId, quantity } = await request.json() as { productId: number; quantity: number };
    let cart = JSON.parse(cookies.get('cart') || '[]') as CartItem[];
    
    const existing = cart.find(item => item.productId === productId);
    if (existing) {
        existing.quantity += quantity;
    } else {
        const product = await getProductById(productId);
        if (!product) {
            return new Response('Product not found', { status: 404 });
        }
        cart.push({
            productId,
            quantity,
            name: product.product,
            price: product.price,
            image_url: product.image_url
        });
    }
    
    cookies.set('cart', JSON.stringify(cart), { 
        path: '/',
        maxAge: 60 * 60 * 24 * 7 // 7 days
    });
    return json(cart);
};

// PUT update quantity
export const PUT: RequestHandler = async ({ request, cookies }) => {
    const { productId, quantity } = await request.json() as { productId: number; quantity: number };
    let cart = JSON.parse(cookies.get('cart') || '[]') as CartItem[];
    
    const item = cart.find(item => item.productId === productId);
    if (!item) {
        return new Response('Item not found', { status: 404 });
    }
    
    if (quantity <= 0) {
        cart = cart.filter(item => item.productId !== productId);
    } else {
        item.quantity = quantity;
    }
    
    cookies.set('cart', JSON.stringify(cart), { path: '/' });
    return json(cart);
};

// DELETE remove item
export const DELETE: RequestHandler = async ({ request, cookies }) => {
    const { productId } = await request.json() as { productId: number };
    let cart = JSON.parse(cookies.get('cart') || '[]') as CartItem[];
    cart = cart.filter(item => item.productId !== productId);
    cookies.set('cart', JSON.stringify(cart), { path: '/' });
    return json(cart);
};