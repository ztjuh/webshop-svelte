// Product type
export interface Product {
  id: number;
  product: string;
  description: string;
  price: number;
  stock: number;
  category: string | null;
  image_url: string | null;
  active: number;
}

// Customer type
export interface Customer {
  id: number;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  phone: string | null;
  address: string | null;
  city: string | null;
  postal_code: string | null;
  country: string | null;
  created_at: Date;
}

// Customer without password (for sessions)
export type CustomerSafe = Omit<Customer, 'password'>;

// Cart item type
export interface CartItem {
  productId: number;
  quantity: number;
  name: string;
  price: number;
  image_url?: string | null;
}

// Order type
export interface Order {
  id: number;
  customer_id: number;
  total_amount: number;
  status: 'pending' | 'completed' | 'shipped' | 'cancelled';
  payment_method: 'paypal' | 'ideal' | 'other';
  paypal_transaction_id: string | null;
  shipping_address: string;
  shipping_city: string;
  shipping_postal_code: string;
  shipping_country: string;
  created_at: Date;
}

// Order item type
export interface OrderItem {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  price: number;
}

// PayPal types
export interface PayPalOrder {
  id: string;
  status: string;
  purchase_units: Array<{
    amount: {
      currency_code: string;
      value: string;
    };
  }>;
}

// Environment variables
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_HOST: string;
      DB_USER: string;
      DB_PASSWORD: string;
      DB_NAME: string;
      PAYPAL_MODE: 'sandbox' | 'live';
      PAYPAL_CLIENT_ID: string;
      PAYPAL_SECRET: string;
      PAYPAL_API_BASE: string;
      ORIGIN: string;
    }
  }
}

export {};