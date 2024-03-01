<script>
	import DatepickerControls from './DatepickerControls.svelte';
	import DayPicker from './DayPicker.svelte';
</script>

<!-- <CrossfadeProvider let:key let:send let:receive> -->
<div
	in:receive|local={{ key }}
	out:send|local={{ key }}
	class="grid w-screen max-w-screen-xl shadow bg-white text-base text-center"
>
	<DatepickerControls />
	<div class="contents">
		<div>
			<DayPicker />
		</div>
		<!-- {#if $store.activeView === 'days'}
				<ViewTransitionEffect>
					<DayPicker />
				</ViewTransitionEffect>
			{:else if $store.activeView === 'months'}
				<ViewTransitionEffect>
					<MonthPicker />
				</ViewTransitionEffect>
			{:else if $store.activeView === 'years'}
				<ViewTransitionEffect>
					<YearPicker />
				</ViewTransitionEffect>
			{/if} -->
	</div>
</div>

<!-- </CrossfadeProvider> -->

<style>
	.grid {
		display: grid;
		/* width: var(--sc-theme-calendar-width); */
		/* max-width: var(--sc-theme-calendar-maxWidth); */
		grid-template-rows: auto calc(
				min(var(--sc-theme-calendar-maxWidth), var(--sc-theme-calendar-width)) * 6 / 7 +
					var(--sc-theme-calendar-legend-height)
			);
		font-family:
			Rajdhani,
			-apple-system,
			BlinkMacSystemFont,
			'Segoe UI',
			Helvetica,
			Arial,
			sans-serif,
			'Apple Color Emoji',
			'Segoe UI Emoji',
			'Segoe UI Symbol';
	}
	.contents {
		display: grid;
		overflow: hidden;
	}
	.grid .contents > :global(*) {
		display: grid;
		grid-row: 1;
		grid-column: 1;
		height: 100%;
		grid-template: 1fr / 1fr;
	}
</style>
