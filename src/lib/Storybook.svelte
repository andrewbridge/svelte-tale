<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { page } from '$app/stores';
    import type { StoryModules } from 'src/app';
    import { configToPath, toPath } from './stories';
    export let modules: StoryModules = {}, active = '';

    const dispatch = createEventDispatcher();
    const setActive = (path) => dispatch('setActive', { path });

    type MenuItem = { title: string, group: string, path: string };
    type MenuGroup = MenuItem[];
    let menu: { [groupName: string]: MenuGroup };
    $: {
        menu = {};
        for (const module of Object.values(modules)) {
            const group = module.StoryConfig.group || 'Components';
            const { title } = module.StoryConfig;
            if (!(group in menu)) {
                menu[group] = [];
            }
            if (module.StoryConfig.isStorybookDefault === true) continue;
            console.log(module.StoryConfig);
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
    let noActive = false;
    $: noActive = typeof Object.values(modules).find((module) => configToPath(module.StoryConfig) === active) === 'undefined';
    let defaultPage;
    $: defaultPage = Object.values(modules).find((module) => module.StoryConfig.isStorybookDefault === true);
    const pathRoot = $page.url.pathname.replace(active, '');
</script>

<div class="storybook-wrapper is-storybook">
    <nav>
        <ul>
            {#if defaultPage}
                <li><a href={pathRoot} class:active={noActive} on:click|preventDefault={() => setActive('')}>{defaultPage.StoryConfig.title}</a></li>
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
        {#if noActive && typeof defaultPage === 'undefined'}
            Sorry, that component doesn't exist
        {:else if noActive}
            <svelte:component this={defaultPage.default} />
        {/if}
    </div>
</div>