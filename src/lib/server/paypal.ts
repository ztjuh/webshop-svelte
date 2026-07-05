import fetch from 'node-fetch';
import type { PayPalOrder } from '$lib/types';

let accessToken: string | null = null;
let tokenExpiry: number = 0;

interface PayPalTokenResponse {
  access_token: string;
  expires_in: number;
}

async function getAccessToken(): Promise<string> {
  if (accessToken && Date.now() < tokenExpiry) {
    return accessToken;
  }

  const auth = Buffer.from(
    `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET}`
  ).toString('base64');

  const response = await fetch(`${process.env.PAYPAL_API_BASE}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'grant_type=client_credentials'
  });

  if (!response.ok) {
    throw new Error(`Failed to get PayPal access token: ${response.statusText}`);
  }

  const data = await response.json() as PayPalTokenResponse;
  accessToken = data.access_token;
  tokenExpiry = Date.now() + (data.expires_in * 1000);
  return accessToken;
}

interface CreateOrderParams {
  cartTotal: number;
  returnUrl: string;
  cancelUrl: string;
  currency?: string;
}

export async function createPayPalOrder({
  cartTotal,
  returnUrl,
  cancelUrl,
  currency = 'USD'
}: CreateOrderParams): Promise<PayPalOrder> {
  const token = await getAccessToken();
  const response = await fetch(`${process.env.PAYPAL_API_BASE}/v2/checkout/orders`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      intent: 'CAPTURE',
      purchase_units: [{
        amount: {
          currency_code: currency,
          value: cartTotal.toFixed(2)
        }
      }],
      application_context: {
        return_url: returnUrl,
        cancel_url: cancelUrl,
        brand_name: 'Faithful Shop',
        landing_page: 'BILLING',
        user_action: 'PAY_NOW'
      }
    })
  });

  if (!response.ok) {
    throw new Error(`PayPal order creation failed: ${response.statusText}`);
  }

  return await response.json() as PayPalOrder;
}

export async function capturePayPalOrder(orderId: string): Promise<any> {
  const token = await getAccessToken();
  const response = await fetch(
    `${process.env.PAYPAL_API_BASE}/v2/checkout/orders/${orderId}/capture`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
  );

  if (!response.ok) {
    throw new Error(`PayPal capture failed: ${response.statusText}`);
  }

  return await response.json();
}

export async function verifyIPN(body: Record<string, string>): Promise<boolean> {
  const verification = new URLSearchParams({
    cmd: '_notify-validate',
    ...body
  });

  const response = await fetch('https://ipnpb.paypal.com/cgi-bin/webscr', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: verification.toString()
  });

  const result = await response.text();
  return result === 'VERIFIED';
}