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

<style>
    h2 {
        margin: 35px 0 25px;
    }
    .canvas {
        position: relative;
        overflow: hidden;
        margin: 25px 0px 40px;
        border-radius: 4px;
        background: rgb(255, 255, 255);
        box-shadow: rgb(0 0 0 / 10%) 0px 1px 3px 0px;
        border: 1px solid rgba(0, 0, 0, 0.1);
        padding: 20px;
    }

    table {
        border-collapse: collapse;
        border-spacing: 0px;
        color: rgb(51, 51, 51);
        font-size: 13px;
        line-height: 20px;
        text-align: left;
        width: 100%;
        margin: 25px 1px 40px;
    }

    tbody {
        box-shadow: rgb(0 0 0 / 10%) 0px 1px 3px 1px, rgb(0 0 0 / 7%) 0px 0px 0px 1px;
        border-radius: 4px;
    }

    tbody tr {
        background: transparent;
        overflow: hidden;
    }

    th, td {
        padding: 10px 15px;
    }

    tr:not(:first-of-type) {
        border-top: 1px solid rgb(230, 230, 230);
    }

    button {
        float: right;
    }
    
    code {
        background-color: #e6e6e6;
        padding: 2px 3px;
        border-radius: 3px;
    }
</style>

<div>
    {#if name}<h2>{name}</h2>{/if}
    <div class="canvas">
        <svelte:component this={context.component} {...customValues} />
    </div>
    <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Default</th>
                <th>Control <button on:click={resetValues}>Reset</button></th>
            </tr>
        </thead>
        <tbody>
            {#each Object.entries(context.argTypes) as [key, arg]}
            <tr>
                <td><label for={key}>
                    {#if arg.name}
                        {arg.name} (<code>{key}</code>)
                    {:else}
                        <code>{key}</code>
                    {/if}</label></td>
                <td>{arg.description || ''}</td>
                <td>{arg.default || '-'}</td>
                <td><input name="{key}" bind:value={customValues[key]} /></td>
            </tr>
            {/each}
        </tbody>
    </table>
</div>