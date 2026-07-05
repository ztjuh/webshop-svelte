// src/lib/server/auth.ts
import { getCustomerByEmail, createCustomer } from './database';
import bcrypt from 'bcrypt';
import type { CustomerSafe } from '$lib/types';

export async function login(email: string, password: string): Promise<CustomerSafe | null> {
    const user = await getCustomerByEmail(email);
    if (!user) return null;

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return null;

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
}

export async function register(
    email: string, 
    password: string, 
    firstname: string, 
    lastname: string
): Promise<CustomerSafe> {
    const existing = await getCustomerByEmail(email);
    if (existing) {
        throw new Error('User already exists');
    }

    const id = await createCustomer(email, password, firstname, lastname);
    return { 
        id, 
        email, 
        firstname, 
        lastname, 
        phone: null, 
        address: null, 
        city: null, 
        postal_code: null, 
        country: null, 
        created_at: new Date() 
    };
}