<script lang="ts" context="module">
    import type { StoryConfiguration } from "src/app";
    
    export const StoryConfig: StoryConfiguration = {
        title: 'Svelte Tale',
        isStorybookDefault: true,
    };
</script>
    
<script >
    import Meta from "$lib/Meta.svelte";
    import { createStory } from "$lib/stories";

    createStory(StoryConfig);
</script>

<Meta />

<p>Welcome to an example design system using Svelte Tale.</p>