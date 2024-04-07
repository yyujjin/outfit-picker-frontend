<script>
	import '../app.css';
</script>

<nav class="flex justify-between text-gray-500 px-10 py-5 border-gray-100 border-b">
	<div>
		<ul class="flex gap-5">
			<li><a href="/" class="font-bold text-gray-700">Today's Outfit</a></li>
			<li><a href="/">Clothes</a></li>
			<li><a href="/codi">Outfit</a></li>
		</ul>
	</div>
	<div>
		<ul class="flex gap-5">
			<li><a href="#">Login</a></li>
		</ul>
	</div>
</nav>
<div class="flex flex-col justify-center items-center min-h-full">
	<slot />
</div>

<style lang="postcss">
	a:hover {
		@apply text-gray-700
	}
</style>
