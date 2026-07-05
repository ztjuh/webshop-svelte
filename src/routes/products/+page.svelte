<script lang="ts">
    import { onMount } from 'svelte';
    import ProductCard from '$lib/components/ProductCard.svelte';
    import type { Product } from '$lib/types';
    import Fa from 'svelte-fa';
    import { faHandHoldingHeart } from '@fortawesome/free-solid-svg-icons';
    
    let products = $state<Product[]>([]);
    let loading = $state(true);
    let error = $state<string | null>(null);
    
    onMount(async () => {
        try {
            const response = await fetch('/api/products');
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            if (Array.isArray(data)) {
                products = data;
            } else {
                console.error('API returned non-array data:', data);
                products = [];
                error = 'Invalid data format received';
            }
        } catch (error) {
            console.error('Failed to load products:', error);
            error = error instanceof Error ? error.message : 'Failed to load products';
            products = [];
        } finally {
            loading = false;
        }
    });
</script>

<svelte:head>
    <title>Our Products - Faithful Shop</title>
    <meta name="description" content="Browse our collection of faith-inspired products." />
</svelte:head>

<div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold text-black mb-8 text-center">
        <Fa icon={faHandHoldingHeart} class="mr-2 inline-block" /> Our Products
    </h1>
    
    {#if error}
        <div class="bg-rose-100 border border-rose-400 text-rose-700 px-4 py-3 rounded mb-4">
            <p>Error loading products: {error}</p>
        </div>
    {/if}
    
    {#if loading}
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {#each Array(6) as _}
                <div class="card animate-pulse">
                    <div class="h-48 bg-gray-300 rounded-t-xl"></div>
                    <div class="p-4 space-y-3">
                        <div class="h-4 bg-gray-300 rounded w-3/4"></div>
                        <div class="h-4 bg-gray-300 rounded w-1/2"></div>
                    </div>
                </div>
            {/each}
        </div>
    {:else if products.length === 0}
        <p class="text-center text-black/70">No products found.</p>
    {:else}
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {#each products as product, index}
                <!-- ✅ Pass index to ProductCard for alternating colors -->
                <ProductCard {product} {index} />
            {/each}
        </div>
    {/if}
</div>