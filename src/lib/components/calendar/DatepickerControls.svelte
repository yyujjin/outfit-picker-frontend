<script lang="ts">
	import Arrow from '$lib/components/generic/Arrow.svelte';
	import { getContext } from 'svelte';
	import { outfitContextKey, storeContextKey } from '$lib/context.js';
	import dayjs from 'dayjs';
	// import KeyControls from '$lib/components/generic/KeyControls.svelte';

	const store = getContext(storeContextKey);
	const outfitStore = getContext(outfitContextKey);

	const UNIT_BY_VIEW = {
		days: 'month',
		months: 'year',
		years: 'year'
	};

	$: visibleMonth = dayjs(new Date($store.year, $store.month, 1));
	$: label = `${$store.activeView === 'days' ? visibleMonth.format('MMMM ') : ''}${$store.year}`;
	$: addMult = $store.activeView === 'years' ? 10 : 1;

	const add = (amount: number) => async () => {
		await outfitStore.setDate($store.year, $store.month + amount);
		store.add(amount * addMult, UNIT_BY_VIEW[$store.activeView]);
	};

	const VIEW_TRANSITIONS = ['days', 'months', 'years'];
	const updateActiveView = () => {
		// TODO transitionIndex가 0이면 바로 리턴하면 안되나?
		const transitionIndex = VIEW_TRANSITIONS.indexOf($store.activeView) + 1;
		const newView = transitionIndex ? VIEW_TRANSITIONS[transitionIndex] : null;
		if (newView) store.setActiveView(newView);
	};

	const KEY_MAPPINGS = {
		pageDown: add(-1),
		pageUp: add(1),
		control: updateActiveView
	};
</script>

<!-- <KeyControls ctx={['days', 'months', 'years']} limit={180} {...KEY_MAPPINGS} /> -->
<div class="controls">
	<button class="button" on:click={add(-1)}>
		<Arrow direction="left" />
	</button>
	<button class="button text-bold" on:click={updateActiveView}>
		{label}
	</button>
	<button class="button" on:click={add(1)}>
		<Arrow direction="right" />
	</button>
</div>

<style>
	.controls {
		display: grid;
		grid-template-columns: auto 1fr auto auto;
		align-items: center;
		text-align: center;
		z-index: 2;
		border-bottom: 1px solid #eee;
		font-size: 1.5em;
		overflow: hidden;
	}
	.controls > :global(*) {
		height: 80px;
		padding: 0 17px;
		display: grid;
		align-items: center;
	}
	.button {
		padding: 10px 18px;
		cursor: pointer;
		background: white;
		transition: all 100ms linear;
	}
	.button:hover {
		@apply bg-gray-200;
	}
</style>
