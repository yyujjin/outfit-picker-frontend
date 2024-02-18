<script lang="ts">
	import Clothes from '$lib/components/Clothes.svelte';
	import type { clothesType } from '$lib/types.js';

	const clothesList: clothesType[] = [
		{ id: 1, category: '상의', name: 'clothes1' },
		{ id: 2, category: '외투', name: 'clothes2' }
	];
</script>

<ul class="p-10 grid gap-5">
	<li class="add bg-white">
		<a href="/add"><p>Add Clothes</p></a>
	</li>
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
	.add {
		border: 1px solid #ddd;
		width: 200px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
</style>
