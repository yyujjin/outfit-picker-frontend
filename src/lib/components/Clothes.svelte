<script lang="ts">
	import hanger from '$lib/images/hanger.png';
	import type { clothesType } from '$lib/types.js';
	import axios from 'axios';

	export let data: clothesType;

	const onRemove = async () => {
		await axios.delete(`/items/${data.id}`);
		alert('옷 삭제');
	};
</script>

<div class="card card-compact w-60 bg-base-100 shadow-xl">
	<figure>
		<img src={hanger} alt="clothes" />
	</figure>
	<div class="card-body">
		<h2 class="card-title">{data.category}</h2>
		<p>{data.name}</p>
		<div class="card-actions justify-end">
			<button class="btn btn-accent btn-md" on:click={onRemove}>Remove</button>
		</div>
	</div>
</div>
