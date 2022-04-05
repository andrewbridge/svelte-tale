<script lang="ts">
    import { getStoryContext } from "./stories";
    
    export let name, args = {};

    const context = getStoryContext();

    const getDefaults = () => ({ ...context.defaultArgs, ...args });
    const customValues = getDefaults();

    const resetValues = () => {
        const defaults = getDefaults();
        Object.keys(customValues).forEach((key) => {
            if (key in defaults) {
                customValues[key] = defaults[key];
            }
        });
    }
</script>
    
{#if name}<h2>{name}</h2>{/if}
<svelte:component this={context.component} {...customValues} />
{#each Object.entries(context.argTypes) as [key, arg]}
    <label for={key}>{arg.name || key}</label>
    <input name="{key}" bind:value={customValues[key]} />
{/each}