<script lang="ts">
	import { getContext } from 'svelte';
	import dayjs from 'dayjs';

	import { outfitContextKey, storeContextKey } from '$lib/context.js';
	// import KeyControls from '$lib/components/generic/KeyControls.svelte';
	import Grid from '$lib/components/generic/Grid.svelte';
	import DayPickerItem from './DayPickerItem.svelte';
	import type { OutfitStore } from '$lib/stores/outfit.js';
	// import InfiniteGrid from '$lib/components/generic/InfiniteGrid.svelte';
	// import Crossfade from '../generic/crossfade/Crossfade.svelte';
	// import scrollable from '$lib/directives/scrollable';
	// import { scrollStep } from '$lib/config/scroll';

	const store = getContext(storeContextKey);
	const outfitStore: OutfitStore = getContext(outfitContextKey);

	// const duration = 450;

	const legend = Array(7)
		.fill(0)
		.map((d, i) =>
			dayjs()
				.day(($store.startOfWeekIndex + i) % 7) // 왜 7로 나눌까
				.format('ddd')
		);

	// const add = (amount) => () => store.add(amount, 'day');

	const select = (day: Date) => () => {
		// TODO 제거필요. 날짜를 선택할 일은 없음
		if (!store.isSelectable(day)) return;
		// store에 selected 설정
		store.setDay(day || $store.selected); // day가 없을 수 있나??
		if (!$store.shouldEnlargeDay) return store.selectDay();
		console.log('select');
		// store.enlargeDay();
		// setTimeout(() => {
		// 	store.selectDay();
		// 	store.enlargeDay(false);
		// }, duration + 60);
	};

	// const KEY_MAPPINGS = {
	// 	left: add(-1),
	// 	right: add(1),
	// 	up: add(-7),
	// 	down: add(7),
	// 	enter: select(),
	// 	escape: () => store.close()
	// };

	const calPagesBetweenDates = (a, b) => {
		// 뭐하는 함수일까
		const yearDelta = b.getFullYear() - a.getFullYear();
		const firstPartialYear = yearDelta ? 12 - a.getMonth() : b.getMonth() - a.getMonth() + 1;
		const fullYears = yearDelta > 1 ? (yearDelta - 1) * 12 : 0;
		const lastPartialYear = yearDelta ? b.getMonth() + 1 : 0;
		return firstPartialYear + fullYears + lastPartialYear;
	};

	const get = (index: number, outfits) => {
		const d = dayjs($store.start).add(index, 'month');
		const days = store.getCalendarPage(d.month(), d.year());
		return {
			days: days.map((day) => ({
				...day,
				hasOutfit: outfits.some((o) => outfitStore.isSameDate(day.date, o.date))
			}))
		};
	};

	// const updateIndex = ({ detail: { step: newIndex } }) => {
	// 	store.add(newIndex - monthIndex, 'month', ['date']);
	// };
	const { data: outfitData } = outfitStore;
	// $: totalMonths = calPagesBetweenDates($store.start, $store.end);
	$: monthIndex = calPagesBetweenDates($store.start, $store.selected) - 1;
	$: data = get(monthIndex, $outfitData.outfits);

	// $: initialY = monthIndex * scrollStep;

	const addContents = (day: Date) => {
		store.setSelected(day);
		outfitStore.init(day);
	};
</script>

<!-- <KeyControls {...KEY_MAPPINGS} ctx={['days']} /> -->

<div class="grid grid-rows-[auto_1fr]">
	<!-- z-index: 2 설정도 있으나 왜 필요한지 파악 필요 -->
	<div class="grid grid-cols-7 bg-base-100 border items-center text-base-content h-10 text-center">
		{#each legend as label}
			<span>{label}</span>
		{/each}
	</div>
	<!-- <Crossfade {duration} let:key let:receive let:send>
		<div class="stage" use:scrollable={{ y: initialY, step: scrollStep }} on:y={updateIndex}>
			<InfiniteGrid
				cellCount={1}
				itemCount={totalMonths}
				bind:index={monthIndex}
				{get}
				let:days
				let:index
			>-->
	<Grid template="repeat(6, 1fr) / repeat(7, 1fr)">
		{#each data.days as day, i (day)}
			<!-- {#if !$store.enlargeDay || index !== monthIndex || !dayjs(day.date).isSame($store.selected)} -->
			<!-- <a
				href="#pickday"
				on:keydown|preventDefault
				on:click|preventDefault={select(day.date)}
				class:disabled={!store.isSelectable(day.date)}
				class:selected={index === monthIndex && dayjs(day.date).isSame($store.selected, 'day')}
				class:outsider={day.outsider}
				아래 두 개 적용 안됨
				out:send|local={{ key }} 
				in:receive|local={{ key }}
			> -->
			<DayPickerItem on:daySelect={select(day.date)} {day} on:addContents={addContents(day.date)} />
			<!-- {/if} -->
		{/each}
	</Grid>
	<!--
			</InfiniteGrid>
		</div>
		{#if $store.enlargeDay}
			<div class="stage selected-big" in:receive|local={{ key }} out:send|local={{ key }}>
				{dayjs($store.selected).date()}
			</div>
		{/if}
	</Crossfade> -->
</div>

<style>
	.stage {
		display: grid;
		grid-row: 2;
		grid-column: 1;
	}
	.selected-big {
		color: var(--sc-theme-calendar-colors-background-highlight);
		background: var(--sc-theme-calendar-colors-background-hover);
		text-align: center;
		align-items: center;
		font-size: var(--sc-theme-calendar-font-large);
		z-index: 2;
		opacity: 1;
		line-height: 0;
	}

	@media (max-width: 720px) {
		.selected-big {
			font-size: calc(var(--sc-theme-calendar-font-large) * 0.7);
		}
	}
</style>
