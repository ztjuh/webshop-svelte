<script lang="ts">
    import { injectAnalytics } from '@vercel/analytics/sveltekit';
    import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
    import Navigation from '$lib/components/Navigation.svelte';
    import { dev } from '$app/environment';
    import '../app.css';
    
    let { children } = $props();
    
    injectAnalytics({ mode: dev ? 'development' : 'production' });
    injectSpeedInsights();
</script>

<Navigation bgcolor='bg-gradient-to-r from-rose-400 via-blue-500 to-rose-400' />

<main class="container mx-auto px-4 py-6 max-w-6xl">
    {@render children()}
</main>

<footer class="text-center text-black/70 py-4 text-sm">
    <p>Made with ❤️ and faith in Jesus Christ | All Glory to Jesus, Hallelujah!</p>
</footer>