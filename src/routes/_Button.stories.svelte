<script lang="ts" context="module">
    import type { StoryConfiguration } from "src/app";
    import Button from "./Button.svelte";
    
    export const StoryConfig: StoryConfiguration = {
        title: 'Button',
        component: Button,
        argTypes: {
            text: { control: 'text', default: 'Button text' }
        }
    };
</script>
    
<script >
    import { createStory } from "$lib/stories";

    createStory(StoryConfig);
</script>
