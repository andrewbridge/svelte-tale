<script lang="ts">
    import { getStoryContext } from "$lib/stories";
    
    
    const { title } = getStoryContext();
</script>

<style>
    h1 {
        margin-bottom: 35px;
    }
</style>

<h1>{title}</h1>