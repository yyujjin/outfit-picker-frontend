<script lang="ts">
	import hanger from '$lib/images/hanger.png';
	import type { clothesType } from '$lib/types.js';
	import { createEventDispatcher } from 'svelte';

	export let data: clothesType;

	const dispatch = createEventDispatcher()
	const onRemove = async () => {
		dispatch('remove',  data.id)		
	};
</script>

<div class="card card-compact w-60 bg-base-100 shadow-xl">
	<figure>
		<img src={data.image || hanger} alt="clothes" />
	</figure>
	<div class="card-body">
		<h2 class="card-title">{data.name}</h2>
		<div class="card-actions justify-between items-center">
			<p class="text-gray-600">{data.category}</p>
			<button class="btn btn-accent btn-sm" on:click={onRemove}>Remove</button>
		</div>
	</div>
</div>
