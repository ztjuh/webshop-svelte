import mysql from 'mysql2/promise';
import bcrypt from 'bcrypt';
import type { Product, Customer, CustomerSafe, Order, OrderItem, CartItem } from '$lib/types';
import { env } from './env';

let pool: mysql.Pool | null = null;

export function getConnection(): mysql.Pool {
  if (!pool) {
    pool = mysql.createPool({
      host: env.DB_HOST,
      user: env.DB_USER,
      password: env.DB_PASSWORD,
      database: env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });
  }
  return pool;
}

// ✅ Fixed: Use RowDataPacket[] for type safety
export async function getProducts(): Promise<Product[]> {
  const db = getConnection();
  const [rows] = await db.query<mysql.RowDataPacket[]>(
    'SELECT * FROM products WHERE active = 1 ORDER BY id'
  );
  return rows as Product[];
}

export async function getProductById(id: number): Promise<Product | null> {
  const db = getConnection();
  const [rows] = await db.query<mysql.RowDataPacket[]>(
    'SELECT * FROM products WHERE id = ? AND active = 1',
    [id]
  );
  return (rows[0] as Product) || null;
}

export async function getCustomerByEmail(email: string): Promise<Customer | null> {
  const db = getConnection();
  const [rows] = await db.query<mysql.RowDataPacket[]>(
    'SELECT * FROM customers WHERE email = ?',
    [email]
  );
  return (rows[0] as Customer) || null;
}

export async function getCustomerById(id: number): Promise<Customer | null> {
  const db = getConnection();
  const [rows] = await db.query<mysql.RowDataPacket[]>(
    'SELECT * FROM customers WHERE id = ?',
    [id]
  );
  return (rows[0] as Customer) || null;
}

export async function createCustomer(
  email: string, 
  password: string, 
  firstname: string, 
  lastname: string
): Promise<number> {
  const db = getConnection();
  const hashedPassword = await bcrypt.hash(password, 10);
  const [result] = await db.query<mysql.ResultSetHeader>(
    `INSERT INTO customers (email, password, firstname, lastname) 
     VALUES (?, ?, ?, ?)`,
    [email, hashedPassword, firstname, lastname]
  );
  return result.insertId;
}

export async function updateCustomer(
  id: number, 
  data: Partial<Omit<Customer, 'id' | 'password' | 'created_at'>>
): Promise<boolean> {
  const db = getConnection();
  const fields: string[] = [];
  const values: any[] = [];
  
  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && key !== 'id') {
      fields.push(`${key} = ?`);
      values.push(value);
    }
  });
  
  if (fields.length === 0) return false;
  
  values.push(id);
  const [result] = await db.query<mysql.ResultSetHeader>(
    `UPDATE customers SET ${fields.join(', ')} WHERE id = ?`,
    values
  );
  return result.affectedRows > 0;
}

export async function createOrder(
  customerId: number,
  total: number,
  paymentMethod: string,
  shippingAddress: string
): Promise<number> {
  const db = getConnection();
  const [result] = await db.query<mysql.ResultSetHeader>(
    `INSERT INTO orders 
     (customer_id, total_amount, payment_method, shipping_address, status) 
     VALUES (?, ?, ?, ?, 'pending')`,
    [customerId, total, paymentMethod, shippingAddress]
  );
  return result.insertId;
}

export async function addOrderItems(orderId: number, cartItems: CartItem[]): Promise<void> {
  const db = getConnection();
  for (const item of cartItems) {
    await db.query(
      `INSERT INTO order_items (order_id, product_id, quantity, price) 
       VALUES (?, ?, ?, ?)`,
      [orderId, item.productId, item.quantity, item.price]
    );
  }
}

export async function getOrder(orderId: number): Promise<Order | null> {
  const db = getConnection();
  const [rows] = await db.query<mysql.RowDataPacket[]>(
    'SELECT * FROM orders WHERE id = ?',
    [orderId]
  );
  return (rows[0] as Order) || null;
}

export async function getOrderItems(orderId: number): Promise<OrderItem[]> {
  const db = getConnection();
  const [rows] = await db.query<mysql.RowDataPacket[]>(
    'SELECT * FROM order_items WHERE order_id = ?',
    [orderId]
  );
  return rows as OrderItem[];
}

export async function getCustomerOrders(customerId: number): Promise<Order[]> {
  const db = getConnection();
  const [rows] = await db.query<mysql.RowDataPacket[]>(
    `SELECT * FROM orders WHERE customer_id = ? ORDER BY created_at DESC`,
    [customerId]
  );
  return rows as Order[];
}

export async function updateOrderStatus(orderId: number, status: Order['status']): Promise<void> {
  const db = getConnection();
  await db.query(
    'UPDATE orders SET status = ? WHERE id = ?',
    [status, orderId]
  );
}

export async function updateOrderPayPalTransaction(orderId: number, txnId: string): Promise<void> {
  const db = getConnection();
  await db.query(
    'UPDATE orders SET paypal_transaction_id = ?, status = "completed" WHERE id = ?',
    [txnId, orderId]
  );
}

export async function updateProductStock(productId: number, quantity: number): Promise<void> {
  const db = getConnection();
  await db.query(
    'UPDATE products SET stock = stock - ? WHERE id = ? AND stock >= ?',
    [quantity, productId, quantity]
  );
}