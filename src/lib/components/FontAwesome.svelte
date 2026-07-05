<script lang="ts">
    import Fa from 'svelte-fa';
    import type { IconDefinition } from '@fortawesome/fontawesome-common-types';
    import type { IconSize } from 'svelte-fa';
    
    // ✅ Only import the icons you actually use in THIS component
    // Since this is a generic component, we don't need to import any icons here
    // The icons will be passed as props from the parent components
    
    let { icon, size = '1x', class: className = '', spin = false }: {
        icon: IconDefinition;
        size?: IconSize;
        class?: string;
        spin?: boolean;
    } = $props();
</script>

<Fa {icon} {size} class={className} {spin} />