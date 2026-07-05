// src/app.d.ts
/// <reference types="@sveltejs/kit" />

declare global {
  namespace App {
    interface Locals {
      user: import('$lib/types').CustomerSafe | null;
    }
    
    interface PageData {
      user: import('$lib/types').CustomerSafe | null;
      cartItems: import('$lib/types').CartItem[];
    }
    
    interface Error {
      message: string;
      code?: number;
    }
  }
}

export {};