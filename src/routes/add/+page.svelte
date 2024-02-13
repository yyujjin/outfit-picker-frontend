<form>
	<h2>Add Clothes</h2>
	<p>Enter your clothes information to add to your closet.</p>
	<div class="input-group">
		<label for="category">Category</label>
		<select name="category" id="category">
			<option value="1">상의</option>
			<option value="2">하의</option>
		</select>
	</div>
	<div class="input-group">
		<label for="name">Name</label>
		<input type="text" name="name" />
	</div>
	<div class="input-group">
		<label for="url">URL</label>
		<input type="text" name="url" id="url" />
	</div>
	<button>Submit</button>
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
