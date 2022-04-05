<script lang="ts">
    import { page } from '$app/stores';
    import type { StoryConfiguration } from 'src/app';
    import type { SvelteComponent } from 'svelte';
    const modules: { [moduleName: string]: { default: SvelteComponent, StoryConfig: StoryConfiguration}} = import.meta.globEager('../**/*.stories.svelte');

    let active;
    $: active = $page.url.pathname.slice(1);

    let noActive = false;
    $: noActive = typeof Object.values(modules).find((module) => module.StoryConfig.title === active) === 'undefined';
    let defaultPage;
    $: defaultPage = Object.values(modules).find((module) => module.StoryConfig.isStorybookDefault === true);
</script>

<div class="storybook-wrapper is-storybook">
    <nav>
        <ul>
            {#if defaultPage}
                <li><a href="/" class:active={noActive}>{defaultPage.StoryConfig.title}</a></li>
            {/if}
            {#each Object.values(modules) as module}
                <li><h3>{module.StoryConfig.group || 'Components'}</h3>
                    <a href={module.StoryConfig.title} class:active={module.StoryConfig.title === active}>{module.StoryConfig.title}</a>
                </li>
            {/each}
        </ul>
    </nav>
    <div class="stories">
        {#each Object.values(modules) as module}
            {#if module.StoryConfig.title === active}
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