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

<li class="clothes">
	<button on:click={onRemove}>remove</button>
	<img src={hanger} alt="hanger" width="200" />
	<div class="category">{data.category}</div>
	<div class="name">{data.name}</div>
</li>

<style>
	.clothes {
		text-align: center;
		margin-right: 10px;
		position: relative;
	}

	.clothes button {
		position: absolute;
		display: none;
		right: 0;
	}
	.clothes:hover button {
		display: block;
	}
	.category {
		font-weight: bold;
	}
	.name {
		color: #666;
	}
</style>
