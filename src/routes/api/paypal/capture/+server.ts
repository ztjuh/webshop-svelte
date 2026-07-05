import { json, type RequestHandler } from '@sveltejs/kit';
import { capturePayPalOrder } from '$lib/server/paypal';
import { createOrder, addOrderItems, updateOrderPayPalTransaction } from '$lib/server/database';
import type { CartItem } from '$lib/types';

interface CaptureRequest {
  orderId: string;
}

export const POST: RequestHandler = async ({ request, cookies }) => {
  const { orderId } = await request.json() as CaptureRequest;
  const cart = JSON.parse(cookies.get('cart') || '[]') as CartItem[];
  const user = JSON.parse(cookies.get('session') || 'null') as { id: number } | null;
  
  if (!user) {
    return new Response('Unauthorized', { status: 401 });
  }
  
  try {
    // Capture payment with PayPal
    const capture = await capturePayPalOrder(orderId);
    
    if (capture.status !== 'COMPLETED') {
      return new Response('Payment not completed', { status: 400 });
    }
    
    // Create order in database
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const orderId_db = await createOrder(
      user.id,
      total,
      'paypal',
      JSON.stringify({ /* shipping address from session */ })
    );
    
    // Add order items
    await addOrderItems(orderId_db, cart);
    
    // Update with PayPal transaction ID
    const transactionId = capture.purchase_units[0]?.payments?.captures[0]?.id;
    if (transactionId) {
      await updateOrderPayPalTransaction(orderId_db, transactionId);
    }
    
    // Clear cart
    cookies.set('cart', '[]', { path: '/' });
    
    return json({ 
      success: true, 
      orderId: orderId_db,
      transactionId 
    });
  } catch (error) {
    console.error('PayPal capture failed:', error);
    return new Response('Payment processing failed', { status: 500 });
  }
};