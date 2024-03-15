<script>
	export let template = 'repeat(4, 1fr) / repeat(3, 1fr)';
</script>

<div class="grid bg-gray-100 gap-px h-full" style="grid-template: {template};">
	<slot />
</div>

<style>
	/* .grid {
		display: grid;
		background: var(--sc-theme-calendar-colors-border);
		row-gap: 1px;
		column-gap: 1px;
		height: 100%;
	} */
	.grid > :global(*) {
		text-decoration: none;
		transition: all 180ms ease-out;
		display: grid;
		text-align: center;
		align-items: center;
	}
	.grid > :global(*) {
		@apply text-base text-base-content bg-white
		/* font-size: var(--sc-theme-calendar-font-regular);
		color: var(--sc-theme-calendar-colors-text-primary);
		background: var(--sc-theme-calendar-colors-background-primary); */;
	}

	@media (max-width: 720px) {
		.grid > :global(*) {
			font-size: calc(var(--sc-theme-calendar-font-regular) * 0.75);
		}
	}

	.grid > :global(*:hover) {
		@apply bg-gray-200
		/* background: var(--sc-theme-calendar-colors-background-hover); */;
	}
	.grid > :global(*.selected > div) {
		@apply bg-accent text-white opacity-100 rounded-full w-6
		/* background: var(--sc-theme-calendar-colors-background-highlight);
		color: var(--sc-theme-calendar-colors-text-highlight);
		opacity: 1; */;
	}
	.grid > :global(*.outsider) {
		/* opacity: var(--sc-theme-calendar-grid-outsiderOpacity); */
		opacity: 0.6;
	}
	.grid > :global(*.disabled) {
		opacity: var(--sc-theme-calendar-grid-disabledOpacity);
	}
	.grid > :global(*.disabled:hover) {
		background: var(--sc-theme-calendar-colors-background-primary);
		cursor: default;
	}
</style>
