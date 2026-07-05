import { json, type RequestHandler } from '@sveltejs/kit';
import { createOrder, addOrderItems } from '$lib/server/database';
import type { CartItem } from '$lib/types';

interface CheckoutRequest {
  shippingAddress: string;
  paymentMethod: string;
}

export const POST: RequestHandler = async ({ request, cookies }) => {
  const { shippingAddress, paymentMethod } = await request.json() as CheckoutRequest;
  const cart = JSON.parse(cookies.get('cart') || '[]') as CartItem[];
  const user = JSON.parse(cookies.get('session') || 'null') as { id: number } | null;
  
  if (!user) {
    return new Response('Unauthorized', { status: 401 });
  }
  
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
  // Create order
  const orderId = await createOrder(
    user.id,
    total,
    paymentMethod,
    shippingAddress
  );
  
  // Add order items
  await addOrderItems(orderId, cart);
  
  // Clear cart
  cookies.set('cart', '[]', { path: '/' });
  
  return json({ orderId });
};