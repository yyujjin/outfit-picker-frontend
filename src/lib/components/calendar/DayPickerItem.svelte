<script lang="ts">
	import { storeContextKey } from "$lib/context.js";
	import dayjs from "dayjs";
	import { createEventDispatcher, getContext } from "svelte";

    export let day

    let isButtonShow = false
	const onMouseEnter = () => {
		isButtonShow = true
	}
    const onMouseLeave = () => {
        isButtonShow = false
    }

    const store = getContext(storeContextKey);
    const dispatch = createEventDispatcher()
</script>
<a
    class="text-base relative"
    href="#pickday"
    on:keydown|preventDefault
    on:click|preventDefault={() => dispatch('daySelect')}
    class:disabled={!store.isSelectable(day.date)}
    class:selected={dayjs(day.date).isSame($store.selected, 'day')}
    class:outsider={day.outsider}
    on:mouseenter={onMouseEnter}
    on:mouseleave={onMouseLeave}
>
    {#if isButtonShow}
        <button class="btn btn-xs left-2.5 top-1 absolute" on:click={()=>dispatch('addContents')}>+</button>
    {/if} 
    <div class="absolute right-2.5 top-1">
        {day.date.getDate()}
    </div>
</a>