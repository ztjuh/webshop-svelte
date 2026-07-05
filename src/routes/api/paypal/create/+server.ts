import { json, type RequestHandler } from '@sveltejs/kit';
import { createPayPalOrder } from '$lib/server/paypal';
import type { CartItem } from '$lib/types';

export const POST: RequestHandler = async ({ request, cookies }) => {
  const cart = JSON.parse(cookies.get('cart') || '[]') as CartItem[];
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
  if (total <= 0) {
    return new Response('Cart is empty', { status: 400 });
  }
  
  const origin = request.headers.get('origin') || 'http://localhost:5173';
  
  try {
    const order = await createPayPalOrder({
      cartTotal: total,
      returnUrl: `${origin}/paypal-return`,
      cancelUrl: `${origin}/cart`
    });
    
    return json(order);
  } catch (error) {
    console.error('PayPal order creation failed:', error);
    return new Response('Payment processing failed', { status: 500 });
  }
};