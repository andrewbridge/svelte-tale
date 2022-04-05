<script lang="ts">
	import { getStoryContext } from '$lib/stories';

	const { title } = getStoryContext();
</script>

<h1>{title}</h1>

<style>
	h1 {
		margin-bottom: 35px;
	}
</style>
