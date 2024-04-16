<script lang="ts">
	import { outfitContextKey, storeContextKey } from '$lib/context.js';
	import dayjs from 'dayjs';
	import { createEventDispatcher, getContext } from 'svelte';

	export let day;

	let isButtonShow = false;
	const onMouseEnter = () => {
		isButtonShow = true;
	};
	const onMouseLeave = () => {
		isButtonShow = false;
	};

	const store = getContext(storeContextKey);
	const outfitStore = getContext(outfitContextKey);

	const dispatch = createEventDispatcher();

	const showOutfit = (date) => {
		outfitStore.setData(date);
	};
</script>

<a
	class="text-base relative"
	href="#pickday"
	on:keydown|preventDefault
	class:disabled={!store.isSelectable(day.date)}
	class:outsider={day.outsider}
	on:mouseenter={onMouseEnter}
	on:mouseleave={onMouseLeave}
>
	{#if isButtonShow}
		<button
			class="btn bg-white btn-xs left-2.5 top-1 absolute"
			on:click={() => dispatch('addContents')}>+</button
		>
	{/if}
	<div class="absolute right-2.5 top-1" class:today={dayjs(day.date).isSame($store.today, 'day')}>
		{day.date.getDate()}
	</div>
	{#if outfitStore.hasOutfit(day.date)}
		<button
			class="btn btn-sm bg-white shadow-sm mx-2 my-10 flex items-center justify-center"
			on:click={() => showOutfit(day.date)}
		>
			<span class="material-symbols-outlined text-gray-600"> apparel </span>
		</button>
	{/if}
</a>

<style lang="postcss">
	.today {
		@apply bg-accent text-white opacity-100 rounded-full w-7 h-7 leading-7;
	}
</style>
