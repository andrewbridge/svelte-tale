<script lang="ts">
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';
    import Storybook from 'svelte-minimal-storybook/Storybook.svelte';

    const modules = import.meta.globEager('../**/*.stories.svelte');
    let active;
    $: active = $page.params.storybook.replace(/storybook\/{0,1}/, '');
</script>

<Storybook active={active} modules={modules} on:setActive={(event) => goto(`/storybook/${event.detail.path}`)} />