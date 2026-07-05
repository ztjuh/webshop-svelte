<script lang="ts">
    import type { Product } from '$lib/types';
    import Fa from 'svelte-fa';
    import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
    
    let { product, index }: { product: Product; index: number } = $props();
    
    // ✅ Alternate colors based on index
    // Even index (0, 2, 4) → Blue, Odd index (1, 3, 5) → Rose
    const bgColor = $derived(index % 2 === 0 ? 'bg-blue-500' : 'bg-rose-400');
    
    async function addToCart(): Promise<void> {
        try {
            const response = await fetch('/api/cart/add', {
                method: 'POST',
                body: JSON.stringify({ 
                    productId: product.id, 
                    quantity: 1 
                }),
                headers: { 'Content-Type': 'application/json' }
            });
            
            if (response.ok) {
                // Show success feedback
                alert('Added to cart! ✝️');
            }
        } catch (error) {
            console.error('Failed to add to cart:', error);
        }
    }
</script>

<!-- ✅ Dynamic background color based on index -->
<div class="card hover:scale-105 transition-transform duration-200 {bgColor}">
    <div class="relative pb-56 overflow-hidden rounded-t-xl">
        <img 
            src={product.image_url || '/images/placeholder.jpg'} 
            alt={product.product}
            class="absolute h-full w-full object-cover"
        />
    </div>
    
    <div class="p-4 text-white">
        <h3 class="text-lg font-semibold truncate">
            {product.product}
        </h3>
        
        <p class="text-sm text-white/80 mt-1 line-clamp-2">
            {product.description}
        </p>
        
        <div class="mt-3 flex items-center justify-between">
            <span class="text-2xl font-bold text-white">
                ${Number(product.price).toFixed(2)}
            </span>
            <button 
                onclick={addToCart}
                class="bg-white/20 hover:bg-white/30 text-white font-medium py-2 px-4 rounded-lg transition-all backdrop-blur-sm flex items-center gap-2"
            >
                <Fa icon={faCartPlus} /> Add
            </button>
        </div>
        
        {#if product.stock < 5 && product.stock > 0}
            <p class="text-xs text-yellow-200 mt-1">
                Only {product.stock} left in stock!
            </p>
        {/if}
    </div>
</div>