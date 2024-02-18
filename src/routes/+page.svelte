<script lang="ts">
	import Clothes from '$lib/components/Clothes.svelte';
	import type { clothesType } from '$lib/types.js';

	const clothesList: clothesType[] = [
		{ id: 1, category: '상의', name: 'clothes1' },
		{ id: 2, category: '외투', name: 'clothes2' }
	];
</script>

<a href="/add" class="btn btn-primary self-end m-5" role="button">
	<i class="uil uil-plus"></i>
	Add Clothes
</a>
<ul class="p-10 grid gap-5">
	{#each clothesList as clothes}
		<Clothes data={clothes} />
	{/each}
</ul>

<style>
	ul {
		display: flex;
		list-style: none;
		text-align: center;
	}
</style>
