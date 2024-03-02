<script lang="ts">
	import { scale } from 'svelte/transition';
	import { storeContextKey } from '$lib/context.js';
	import { getContext } from 'svelte';

	const store = getContext(storeContextKey);
</script>

<div
	in:scale={{ start: $store.activeViewDirection * 0.5 + 1, delay: 110 }}
	out:scale={{ start: $store.activeViewDirection * -0.5 + 1 }}
>
	<slot />
</div>
