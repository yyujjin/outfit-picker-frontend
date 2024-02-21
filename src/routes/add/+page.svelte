<script lang="ts">
	import axios from 'axios';

	const data = {
		category: 1,
		itemName: '',
		image: ''
	};
	const onSubmit = async (e) => {
		e.preventDefault();
		await axios.post('/api/items', {
			...data,
			category: Number(data.category)
		});

		location.href = '/';
	};
</script>

<form class="h-screen space-y-5" on:submit={onSubmit}>
	<div>
		<h2 class="text-2xl">Add Clothes</h2>
		<p>Enter your clothes information to add to your closet.</p>
	</div>
	<div class="input-group">
		<label for="category">Category</label>
		<select name="category" id="category" class="select select-bordered" bind:value={data.category}>
			<option value="1">상의</option>
			<option value="2">하의</option>
		</select>
	</div>
	<div class="input-group">
		<label for="name">Name</label>
		<input type="text" name="name" class="input input-bordered" bind:value={data.itemName} />
	</div>
	<div class="input-group">
		<label for="url">URL</label>
		<input type="text" name="url" id="url" class="input input-bordered" bind:value={data.image} />
	</div>
	<button class="btn btn-primary">Submit</button>
</form>

<style>
	form {
		max-width: 500px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		/* align-items: center; */
	}
	h2 {
		font-weight: 900;
	}
	p {
		color: gray;
	}
	.input-group {
		display: flex;
		flex-direction: column;
	}
	.input-group > * {
		margin-bottom: 5px;
	}
	.input-group + .input-group {
		margin-top: 10px;
	}
	label {
		font-weight: bold;
	}
	button {
		margin: 10px 0;
	}
</style>
