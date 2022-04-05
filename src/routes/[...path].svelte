<script lang="ts">
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';
    import Storybook from '$lib/Storybook.svelte';
    import type { StoryModules } from 'src/app';

    const modules: StoryModules = import.meta.globEager('../**/*.stories.svelte');
    let active;
    $: active = $page.params.path;
</script>

<Storybook active={active} modules={modules} on:setActive={(event) => goto(`/${event.detail.path}`)} />
