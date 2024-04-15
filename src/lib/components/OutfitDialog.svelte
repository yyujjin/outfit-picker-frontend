<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import * as RadioGroup from '$lib/components/ui/radio-group/index.js';
	import { getContext } from 'svelte';
	import { outfitContextKey, storeContextKey } from '$lib/context.js';
	import axios from 'axios';

	const store = getContext(outfitContextKey);

	$: date = $store.date;
	$: weather = $store.weather;
	$: temperature = $store.temperature;
	$: photo = $store.photo;

	const onSubmit = async () => {
		const data = {
			date,
			weather: Number(weather),
			temperature,
			photo
		};

		try {
			await axios.post('/api/coordis', data);
		} catch (e) {
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
		<Dialog.Footer>
			<button class="btn btn-primary" on:click={onSubmit}>Submit</button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
