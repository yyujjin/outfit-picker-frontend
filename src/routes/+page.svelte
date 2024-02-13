<script>
	import Clothes from '$lib/components/Clothes.svelte';

	const clothesList = [
		{ category: '상의', name: 'clothes1' },
		{ category: '외투', name: 'clothes2' }
	];
</script>

<ul>
	<li class="add">
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
