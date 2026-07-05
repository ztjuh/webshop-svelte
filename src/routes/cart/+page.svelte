<script lang="ts">
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import type { CartItem } from '$lib/types';
    import Fa from 'svelte-fa';
    import { 
        faCartShopping,
        faArrowLeft,
        faLock,
        faTrash,
        faSpinner
    } from '@fortawesome/free-solid-svg-icons';
    
    let cartItems = $state<CartItem[]>([]);
    let total = $state(0);
    let loading = $state(true);
    
    onMount(async () => {
        await loadCart();
        loading = false;
    });
    
    async function loadCart(): Promise<void> {
        try {
            const response = await fetch('/api/cart');
            cartItems = await response.json();
            total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
        } catch (error) {
            console.error('Failed to load cart:', error);
        }
    }
    
    async function updateQuantity(productId: number, newQuantity: number): Promise<void> {
        if (newQuantity < 1) return;
        
        try {
            const response = await fetch('/api/cart/update', {
                method: 'PUT',
                body: JSON.stringify({ productId, quantity: newQuantity }),
                headers: { 'Content-Type': 'application/json' }
            });
            
            if (response.ok) {
                await loadCart();
            }
        } catch (error) {
            console.error('Failed to update quantity:', error);
        }
    }
    
    async function removeItem(productId: number): Promise<void> {
        try {
            const response = await fetch(`/api/cart/remove`, {
                method: 'DELETE',
                body: JSON.stringify({ productId }),
                headers: { 'Content-Type': 'application/json' }
            });
            
            if (response.ok) {
                await loadCart();
            }
        } catch (error) {
            console.error('Failed to remove item:', error);
        }
    }
    
    async function checkout(): Promise<void> {
        goto('/checkout');
    }
</script>

<svelte:head>
    <title>Shopping Cart - Faithful Shop</title>
</svelte:head>

<div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold text-black mb-8 text-center">
        <Fa icon={faCartShopping} class="mr-2 inline-block" /> Shopping Cart
    </h1>
    
    {#if loading}
        <div class="animate-pulse space-y-4">
            {#each Array(3) as _}
                <div class="flex items-center justify-between border-b pb-4">
                    <div class="flex items-center space-x-4">
                        <div class="h-16 w-16 bg-gray-300 rounded"></div>
                        <div>
                            <div class="h-4 bg-gray-300 rounded w-32"></div>
                            <div class="h-4 bg-gray-300 rounded w-20 mt-2"></div>
                        </div>
                    </div>
                    <div class="h-10 w-24 bg-gray-300 rounded"></div>
                </div>
            {/each}
        </div>
    {:else if cartItems.length === 0}
        <div class="text-center py-12">
            <Fa icon={faCartShopping} class="text-6xl text-black/30 mx-auto" />
            <p class="text-black/70 text-lg mt-4">Your cart is empty</p>
            <a href="/products" class="btn-primary inline-block mt-6">
                <Fa icon={faArrowLeft} class="mr-2" /> Continue Shopping
            </a>
        </div>
    {:else}
        <div class="bg-white/90 backdrop-blur-sm rounded-xl shadow-md overflow-hidden">
            <ul class="divide-y divide-gray-200">
                {#each cartItems as item}
                    <li class="p-4 flex flex-col sm:flex-row items-center justify-between hover:bg-gray-50/50">
                        <div class="flex items-center space-x-4 w-full sm:w-auto">
                            <img 
                                src={item.image_url || '/images/placeholder.jpg'} 
                                alt={item.name}
                                class="h-16 w-16 object-cover rounded"
                            />
                            <div>
                                <h3 class="font-medium text-black">{item.name}</h3>
                                <p class="text-sm text-black/70">${Number(item.price).toFixed(2)}</p>
                            </div>
                        </div>
                        
                        <div class="flex items-center space-x-4 mt-4 sm:mt-0">
                            <div class="flex items-center border rounded-lg overflow-hidden">
                                <button 
                                    onclick={() => updateQuantity(item.productId, item.quantity - 1)}
                                    class="px-3 py-1 hover:bg-gray-100"
                                    aria-label="Decrease quantity"
                                >
                                    -
                                </button>
                                <span class="px-3 py-1 min-w-[2rem] text-center">
                                    {item.quantity}
                                </span>
                                <button 
                                    onclick={() => updateQuantity(item.productId, item.quantity + 1)}
                                    class="px-3 py-1 hover:bg-gray-100"
                                    aria-label="Increase quantity"
                                >
                                    +
                                </button>
                            </div>
                            
                            <button 
                                onclick={() => removeItem(item.productId)}
                                class="text-rose-600 hover:text-rose-800 transition-colors"
                                aria-label="Remove item from cart"
                            >
                                <Fa icon={faTrash} />
                            </button>
                        </div>
                    </li>
                {/each}
            </ul>
            
            <div class="bg-black/5 p-6 border-t border-gray-200">
                <div class="flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div>
                        <span class="text-black/70">Subtotal</span>
                        <span class="text-2xl font-bold text-black ml-4">
                            ${total.toFixed(2)}
                        </span>
                    </div>
                    <button 
                        onclick={checkout}
                        class="btn-primary text-lg px-8 py-3 w-full sm:w-auto inline-flex items-center justify-center"
                    >
                        <Fa icon={faLock} class="mr-2" /> Proceed to Checkout
                    </button>
                </div>
            </div>
        </div>
    {/if}
</div>