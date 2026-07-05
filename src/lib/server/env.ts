// src/lib/server/env.ts
import { z } from 'zod';
import { 
  DB_HOST, 
  DB_USER, 
  DB_PASSWORD, 
  DB_NAME, 
  DB_PORT,
  PAYPAL_MODE,
  PAYPAL_CLIENT_ID,
  PAYPAL_SECRET,
  PAYPAL_API_BASE,
  ORIGIN
} from '$env/static/private';

const envSchema = z.object({
  DB_HOST: z.string().default('localhost'),
  DB_USER: z.string().default('webshop-svelte'),
  DB_PASSWORD: z.string().min(1, 'DB_PASSWORD is required'),
  DB_NAME: z.string().default('webshop_db'),
  DB_PORT: z.coerce.number().default(3306),
  
  PAYPAL_MODE: z.enum(['sandbox', 'live']).default('sandbox'),
  PAYPAL_CLIENT_ID: z.string().min(1, 'PAYPAL_CLIENT_ID is required'),
  PAYPAL_SECRET: z.string().min(1, 'PAYPAL_SECRET is required'),
  PAYPAL_API_BASE: z.string().url().default('https://api-m.sandbox.paypal.com'),
  
  ORIGIN: z.string().url().default('http://localhost:5173')
});

export const env = envSchema.parse({
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  DB_PORT,
  PAYPAL_MODE,
  PAYPAL_CLIENT_ID,
  PAYPAL_SECRET,
  PAYPAL_API_BASE,
  ORIGIN
});