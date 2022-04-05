<script lang="ts" context="module">
    import type { StoryConfiguration } from "src/app";
    import Button from "./_Button.svelte";
    
    export const StoryConfig: StoryConfiguration = {
        title: 'Button',
        component: Button,
        argTypes: {
            text: { control: 'text', default: 'Button text' }
        }
    };
</script>
    
<script >
    import Meta from "$lib/Meta.svelte";
    import { createStory } from "$lib/stories";
import Story from "$lib/Story.svelte";

    createStory(StoryConfig);
</script>

<Meta />

<Story name="Default" />