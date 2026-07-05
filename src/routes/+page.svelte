<script lang="ts">
    import { onMount } from 'svelte';
    import type { Product } from '$lib/types';
    import Fa from 'svelte-fa';
    import { 
        faCross,
        faStore,
        faStar,
        faHandsPraying,
        faRightToBracket,  // ✅ Added this import
        faUserPlus          // ✅ Added this import
    } from '@fortawesome/free-solid-svg-icons';
    
    let featuredProducts = $state<Product[]>([]);
    let loading = $state(true);
    
    onMount(async () => {
        try {
            const response = await fetch('/api/products');
            const allProducts = await response.json();
            featuredProducts = allProducts.slice(0, 3);
        } catch (error) {
            console.error('Failed to load featured products:', error);
        } finally {
            loading = false;
        }
    });
</script>

<svelte:head>
    <meta name="description" content="Faithful Shop - Christian e-commerce platform. Browse faith-inspired products in Jesus' name!">
    <meta name="keywords" content="Jesus, Gospel, Faith, Christian, God, Bible, Prayer">
    <meta name="author" content="Alex Mester">
    <meta name="robots" content="index, follow">
    
    <meta property="og:title" content="Faithful Shop ✝️ | Christian Products">
    <meta property="og:description" content="Browse our faith-inspired products. All glory to Jesus Christ!">
    <meta property="og:type" content="website">
    
    <title>Faithful Shop ✝️ | Christian E-Commerce</title>
</svelte:head>

<div class="container mx-auto p-4">
    <!-- Hero Section -->
    <div class="text-center py-12 bg-white/30 backdrop-blur-sm rounded-2xl mb-8">
        <h1 class="text-4xl md:text-6xl font-bold text-black">
            <Fa icon={faCross} class="mr-3 inline-block" /> Faithful Shop
        </h1>
        <p class="text-xl text-black/80 mt-4 max-w-2xl mx-auto">
            "The blessing of the Lord brings wealth, and He adds no trouble with it." 
            <br /><span class="text-sm">— Proverbs 10:22</span>
        </p>
        <div class="mt-6 flex flex-wrap justify-center gap-4">
            <a href="/auth/login" class="btn-secondary text-lg px-8 py-3 inline-flex items-center">
                <Fa icon={faRightToBracket} class="mr-2" /> Login
            </a>
            <a href="/auth/register" class="btn-primary text-lg px-8 py-3 inline-flex items-center">
                <Fa icon={faUserPlus} class="mr-2" /> Register
            </a>
        </div>
        <div class="mt-4 flex flex-wrap justify-center gap-4">
            <a href="/products" class="btn-primary text-lg px-8 py-3 inline-flex items-center">
                <Fa icon={faStore} class="mr-2" /> Browse Products
            </a>
        </div>
    </div>
    
    <!-- Featured Products -->
    <h2 class="text-2xl font-bold text-black text-center mb-6">
        <Fa icon={faStar} class="mr-2 inline-block" /> Featured Products
    </h2>
    
    {#if loading}
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {#each Array(3) as _}
                <div class="card animate-pulse">
                    <div class="h-48 bg-gray-300 rounded-t-xl"></div>
                    <div class="p-4 space-y-3">
                        <div class="h-4 bg-gray-300 rounded w-3/4"></div>
                        <div class="h-4 bg-gray-300 rounded w-1/2"></div>
                    </div>
                </div>
            {/each}
        </div>
    {:else}
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {#each featuredProducts as product}
                <a href="/product/{product.id}" class="card hover:scale-105 transition-transform">
                    <img 
                        src={product.image_url || '/images/placeholder.jpg'} 
                        alt={product.product}
                        class="h-48 w-full object-cover"
                    />
                    <div class="p-4">
                        <h3 class="font-semibold text-black">{product.product}</h3>
                        <p class="text-sm text-black/70">${Number(product.price).toFixed(2)}</p>
                    </div>
                </a>
            {/each}
        </div>
    {/if}
    
    <!-- Blessing Section -->
    <div class="mt-12 text-center bg-rose-400/30 backdrop-blur-sm rounded-2xl p-8">
        <h2 class="text-2xl font-bold text-black">
            <Fa icon={faHandsPraying} class="mr-2 inline-block" /> May God Bless You!
        </h2>
        <p class="text-black/80 mt-2">
            "For God so loved the world that He gave His one and only Son, 
            that whoever believes in Him shall not perish but have eternal life." 
            <br /><span class="text-sm">— John 3:16</span>
        </p>
    </div>
</div>