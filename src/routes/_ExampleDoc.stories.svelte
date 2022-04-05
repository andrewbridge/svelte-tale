<script lang="ts" context="module">
    import type { StoryConfiguration } from "src/app";
    
    export const StoryConfig: StoryConfiguration = {
        title: 'Using Svelte Tale',
        group: 'Documentation'
    };
</script>
    
<script >
    import Meta from "$lib/Meta.svelte";
    import { createStory } from "$lib/stories";

    createStory(StoryConfig);
</script>

<Meta />

<p>Svelte Tale can be used either as a template for a design system or documentation website, or as an importable library
    that can be integrated into a pre-existing project.</p>