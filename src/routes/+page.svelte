<script lang="ts">
	import Clothes from '$lib/components/Clothes.svelte';
	import type { clothesType } from '$lib/types.js';
	import axios from 'axios';

	const fetchData = async () => {
		const { data } = await axios.get(`/api/items`);
		return data.data;
	};

	const promise = fetchData();
</script>

<a href="/add" class="btn btn-primary self-end m-5" role="button">
	<i class="uil uil-plus"></i>
	Add Clothes
</a>
{#await promise}
	loading
{:then clothesList}
	<ul class="p-10 grid gap-5 grid-cols-4">
		{#each clothesList as clothes}
			<Clothes data={clothes} />
		{/each}
	</ul>
{/await}
