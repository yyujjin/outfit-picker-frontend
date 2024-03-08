<script lang="ts">
	import { getContext } from 'svelte';
	import { storeContextKey } from '$lib/context';
	import dayjs from 'dayjs';
	// import KeyControls from '$lib/components/generic/KeyControls.svelte';
	import Grid from '$lib/components/generic/Grid.svelte';
	import InfiniteGrid from '$lib/components/generic/InfiniteGrid.svelte';
	// import scrollable from '$lib/directives/scrollable';
	// import { scrollStep } from '$lib/config/scroll';

	const store = getContext(storeContextKey);

	let grid; //InfiniteGrid에서 사용함

	const get = (index: number) => ({
		// TODO 스크롤 시 index 값이 필요한 것으로 보이나 지금은 현재 year만 사용
		months: Array(12)
			.fill(0)
			.map((d, i) => {
				const year = $store.year; //$store.start.getFullYear() + index;
				const month = dayjs(new Date(year, i, 1));
				return {
					year,
					label: month.format('MMM'),
					index: i,
					disabled: !store.isSelectable(month, ['date'])
				};
			})
	});

	const close = () => store.setActiveView('days');

	interface Month {
		year: number;
		label: string;
		index: number;
		disabled: boolean;
	}

	const select = (month: Month) => () => {
		if (month.disabled) return;
		store.setMonth(month.index);
		close();
	};

	const add = (amount) => () => {
		store.add(amount, 'month', ['date']);
	};

	const updateIndex = ({ detail: { step: newIndex } }) => {
		store.add(newIndex - yearIndex, 'year', ['month', 'date']);
	};

	const isSelected = (
		month: { disabled: boolean; index: number; label: string; year: number },
		i: number
	) => {
		// TODO i를 받을 필요 없이 month의 index 로도 비교할 수 있지 않나?
		console.log(month);
		return $store.month === i && $store.year === month.year;
	};

	const KEY_MAPPINGS = {
		left: add(-1),
		right: add(1),
		up: add(-3),
		down: add(3),
		enter: close,
		escape: close
	};

	$: yearIndex = $store.year - $store.start.getFullYear(); // TODO 현재 선택된 년도와 시작년도의 차이 값인데 왜 이름이 Index일까
	console.log($store.year - $store.start.getFullYear());
	// $: initialY = yearIndex * scrollStep;
	$: itemCount = $store.end.getFullYear() - $store.start.getFullYear() + 1;

	// let { months } = get(100); // TODO
	// console.log(months);
</script>

<!-- <KeyControls {...KEY_MAPPINGS} ctx={['months']} /> -->
<!-- <div use:scrollable={{ y: initialY, step: scrollStep, maxSteps: itemCount }} on:y={updateIndex}>-->
<InfiniteGrid cellCount={1} {itemCount} bind:index={yearIndex} {get} let:months bind:this={grid}>
	<Grid template="repeat(4, 1fr) / repeat(3, 1fr)">
		{#each months as month, i}
			<!-- <a
					class:disabled={month.disabled} <- TODO: 적용해야 함
					class:selected={$store.month === i && $store.year === month.year}
					href="#selectMonth"
					on:click|preventDefault={select(month)}
				> -->
			<a
				href="#selectMonth"
				class:selected={isSelected(month, i)}
				on:click|preventDefault={select(month)}
			>
				{month.label}
			</a>
		{/each}
	</Grid>
</InfiniteGrid>

<!--</div> -->

<style>
	div {
		display: grid;
		height: 100%;
	}
</style>
