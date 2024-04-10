<script lang="ts">
	import Clothes from '$lib/components/Clothes.svelte';
	import type { clothesType } from '$lib/types.js';
	import axios from 'axios';

	const fetchData = async () => {
		const { data } = await axios.get(`/api/items`);
		const dummyImage = data.data.map(d => ({...d, image: null}) )
		//return data.data;
		return dummyImage
	};

	const onRemove = async ({detail: id}) => {
		await axios.delete(`/api/items/${id}`);
		promise = fetchData()
	};

	let promise = fetchData();
</script>

<a href="/clothes/add" class="btn btn-primary self-end mt-5 top-0" role="button">
	<i class="uil uil-plus"></i>
	Add Clothes
</a>
{#await promise}
	loading
{:then clothesList}
	<ul class="py-10 grid gap-5 grid-cols-4">
		{#each clothesList as clothes}
			<Clothes data={clothes} on:remove={onRemove} />
		{/each}
	</ul>
{/await}
