<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import * as RadioGroup from '$lib/components/ui/radio-group/index.js';
	import { getContext } from 'svelte';
	import { outfitContextKey } from '$lib/context.js';
	import axios from 'axios';
	import { Mode } from '$lib/stores/outfit.js';

	const store = getContext(outfitContextKey);

	let date = $store.date;
	let weather = $store.weather.toString();
	let temperature = $store.temperature;
	let photo = $store.photo;

	const onSubmit = async () => {
		const data = {
			date,
			weather: Number(weather),
			temperature,
			photo
		};

		try {
			await store.postOutfit(data);
			store.closeDialog();
		} catch (e) {
			console.error(e);
		}
	};

	const onRemove = async () => {
		if (!confirm('Are you sure you want to delete?')) {
			return;
		}
		try {
			await store.deleteOutfit();
			store.closeDialog();
		} catch (e) {
			alert('Network Error!');
			console.error(e);
		}
	};
</script>

<Dialog.Root bind:open={$store.dialogOpen}>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Record Outfit</Dialog.Title>
			<Dialog.Description>Let's record today's outfit!</Dialog.Description>
		</Dialog.Header>
		<div class="grid grid-cols-1 items-center gap-4 py-4">
			<div class="form-control">
				<h2 class="text-md font-semibold text-gray-700">Date</h2>
				<input
					type="date"
					class="input input-bordered input-sm"
					name=""
					id=""
					bind:value={date}
					disabled
				/>
			</div>
			<div class="form-control">
				<h2 class="text-md font-semibold text-gray-700">Weather</h2>
				<RadioGroup.Root class="grid-flow-col" bind:value={weather}>
					{#each ['uil-sun', 'uil-cloud', 'uil-cloud-showers-heavy', 'uil-snowflake'] as w, i}
						<div class="flex items-center space-x-2">
							<RadioGroup.Item value={i.toString()} id={w} />
							<label for={w} class="label">
								<i class="uil {w} text-2xl"></i>
							</label>
						</div>
					{/each}
				</RadioGroup.Root>
			</div>
			<div class="form-control">
				<h2 class="text-md font-semibold text-gray-700">Temperature</h2>
				<input type="number" class="input input-bordered input-sm" bind:value={temperature} />
			</div>
			<input type="hidden" name="photo" bind:value={photo} />
		</div>
		{#if $store.mode === Mode.ADD}
			<div class="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
				<button class="btn btn-primary" on:click={onSubmit}>Submit</button>
			</div>
		{:else}
			<div class="flex justify-between">
				<button class="btn btn-accent" on:click={onRemove}>Remove</button>

				<button class="btn" on:click={() => store.closeDialog()}>Close</button>
			</div>
		{/if}
	</Dialog.Content>
</Dialog.Root>
