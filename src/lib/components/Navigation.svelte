<!-- src/lib/components/Navigation.svelte -->
<script lang="ts">
    import Fa from 'svelte-fa';
    import { 
        faHouse,
        faBox,
        faCartShopping,
        faRightToBracket,
        faUserPlus
    } from '@fortawesome/free-solid-svg-icons';
    
    let { bgcolor = "bg-blue-500" }: { bgcolor: string } = $props();
    let cartCount = 0;
</script>

<div class="container p-4 mx-auto">
    <div class="rounded-lg {bgcolor}">
        <div class="grid grid-rows-1 grid-cols-5 px-4 py-2">
            <!-- Home - Icon Left -->
            <div class="px-4 py-2 text-sm justify-self-center text-center">
                <a href="/" class="hover:underline hover:text-black inline-flex items-center">
                    <Fa icon={faHouse} class="mr-2 inline-block" /> Home
                </a>
            </div>
            
            <!-- Products - Icon Left -->
            <div class="px-4 py-2 text-sm justify-self-center text-center">
                <a href="/products" class="hover:underline hover:text-black inline-flex items-center">
                    <Fa icon={faBox} class="mr-2 inline-block" /> Products
                </a>
            </div>
            
            <!-- Cart - Icon Left -->
            <div class="px-4 py-2 text-sm justify-self-center text-center">
                <a href="/cart" class="hover:underline hover:text-black inline-flex items-center">
                    <Fa icon={faCartShopping} class="mr-2 inline-block" /> Cart
                    {#if cartCount > 0}
                        <span class="bg-red-600 text-white text-xs rounded-full px-2 py-0.5 ml-1">
                            {cartCount}
                        </span>
                    {/if}
                </a>
            </div>
            
            <!-- Login - Icon Left -->
            <div class="px-4 py-2 text-sm justify-self-center text-center">
                <a href="/auth/login" class="hover:underline hover:text-black inline-flex items-center">
                    <Fa icon={faRightToBracket} class="mr-2 inline-block" /> Login
                </a>
            </div>
            
            <!-- Register - Icon Left -->
            <div class="px-4 py-2 text-sm justify-self-center text-center">
                <a href="/auth/register" class="hover:underline hover:text-black inline-flex items-center">
                    <Fa icon={faUserPlus} class="mr-2 inline-block" /> Register
                </a>
            </div>
        </div>
    </div>
</div>