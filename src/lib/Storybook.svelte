<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { page } from '$app/stores';
    import type { StoryModule, StoryModules } from 'src/app';
    import { configToPath, toPath } from './stories';
    export let modules: StoryModules = {}, active = '', pathRoot = '/';

    const dispatch = createEventDispatcher();
    const setActive = (path) => dispatch('setActive', { path });

    type MenuItem = { title: string, group: string, path: string };
    type MenuGroup = MenuItem[];

    let modulesIterator: StoryModule[],
        activeComponent: StoryModule,
        noActive = false,
        defaultComponent: StoryModule,
        menu: { [groupName: string]: MenuGroup };
    $: {
        modulesIterator = Object.values(modules);
        activeComponent = modulesIterator.find((module) => configToPath(module.StoryConfig) === active);
        noActive = typeof activeComponent === 'undefined';
        defaultComponent = modulesIterator.find((module) => module.StoryConfig.isStorybookDefault === true);

        menu = {};
        for (const module of Object.values(modules)) {
            const group = module.StoryConfig.group || 'Components';
            const { title } = module.StoryConfig;
            if (!(group in menu)) {
                menu[group] = [];
            }
            if (module.StoryConfig.isStorybookDefault === true) continue;
            menu[group].push({ title, group, path: toPath(title, group) });
        }
        Object.values(menu).forEach((menuGroup) => menuGroup.sort((a, b) => {
            const aTitle = a.title;
            const bTitle = b.title;
            if (aTitle === bTitle)
                return 0;
            if (aTitle < bTitle)
                return -1;
            if (aTitle > aTitle)
                return 1;
        }));
    }
</script>

<style>
    :global(*) {
        margin: 0;
        padding: 0;
    }

    :global(html, body) {
        font-family: 'Avenir Next', 'Segoe UI', sans-serif;
        color: rgb(46,46,59);
        margin: 0 !important; /* Counteract any global styles applied by story components */
    }

    .storybook-wrapper {
        display: flex;
        min-height: 100vh;
    }

    nav {
        width: 20%;
        padding: 20px;
        max-width: 200px;
        background: #F3F5F7;;
    }

    nav h3 {
        padding-top: 20px;
    }

    nav a {
        background: none;
        border: none;
        border-radius: 3px;
        padding: 5px;
        width: 100%;
        font-weight: 600;
        display: block;
        color: inherit;
        text-decoration: none;
    }

    nav a:hover {
        background-color: #b7c2cca2;
    }

    nav a.active {
        background-color: #B7C2CC;
    }

    nav ul {
        list-style: none;
    }

    .stories {
        flex-grow: 1;
        padding: 20px 10%;
    }
</style>

<div class="storybook-wrapper is-storybook">
    <nav>
        <ul>
            {#if defaultComponent}
                <li><a href={pathRoot} class:active={noActive} on:click|preventDefault={() => setActive('')}>{defaultComponent.StoryConfig.title}</a></li>
            {/if}
            {#each Object.entries(menu) as [name, group]}
                <li><h3>{name}</h3>
                <ul>
                    {#each group as item}
                        <li><a href={pathRoot + item.path} class:active="{configToPath(item) === active}" on:click|preventDefault={() => setActive(item.path)}>{item.title}</a></li>
                    {/each}
                </ul></li>
            {/each}
        </ul>
    </nav>
    <div class="stories">
        {#each Object.values(modules) as module}
            {#if configToPath(module.StoryConfig) === active}
                <svelte:component this={module.default} />
            {/if}
        {/each}
        {#if noActive && typeof defaultComponent === 'undefined'}
            Sorry, that component doesn't exist
        {:else if noActive}
            <svelte:component this={defaultComponent.default} />
        {/if}
    </div>
</div>