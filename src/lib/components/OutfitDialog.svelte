<script lang="ts">
    import * as Dialog from "$lib/components/ui/dialog/index.js";
	import * as RadioGroup from "$lib/components/ui/radio-group/index.js";
	import { dialogOpen } from "$lib/stores/coordie.js";

    console.log($dialogOpen)
</script>

<Dialog.Root bind:open={$dialogOpen}>
	<Dialog.Content class="sm:max-w-[425px]">
	  <Dialog.Header>
		<Dialog.Title>Record Outfit</Dialog.Title>
		<Dialog.Description>
			Let's record today's outfit! 
		</Dialog.Description>
	  </Dialog.Header>
	  <div class="grid grid-cols-1 items-center gap-4 py-4">
			<div class="form-control">
				<h2 class="text-md font-semibold text-gray-700">Date</h2>
				<input type="date" class="input input-bordered input-sm" name="" id="">
			</div>
			<div class="form-control">
				<h2 class="text-md font-semibold text-gray-700">Weather</h2>
				<RadioGroup.Root value="option-one" >
					<div class="flex items-center space-x-2">
					<RadioGroup.Item value="option-one" id="option-one" />
					<label for="option-one" class="label">SUN</label>
					</div>
					<div class="flex items-center space-x-2">
					<RadioGroup.Item value="option-two" id="option-two" />
					<label for="option-two" class="label">CROUDY</label>
					</div>
				</RadioGroup.Root>
			</div>
			<div class="form-control">
				<h2 class="text-md font-semibold text-gray-700">Temperature</h2>
				<input type="number" class="input input-bordered input-sm" />
			</div>
			<input type="hidden" name="photo" value="photo">
	  </div>
	  <Dialog.Footer>
		<button>submit</button>
	  </Dialog.Footer>
	</Dialog.Content>
  </Dialog.Root>