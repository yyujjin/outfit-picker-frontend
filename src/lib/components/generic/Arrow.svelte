<script>
	export let direction = 'left';
</script>

<i class="border-base-content {direction}" />

<style>
	i {
		display: inline-block;
		width: 23px;
		height: 23px;
		border-style: solid;
		border-width: 0;
		border-bottom-width: 3px;
		border-right-width: 3px;
		transform-origin: center center;
	}
	i.right {
		transform: translateX(-6px) rotate(-45deg);
	}
	i.left {
		transform: translateX(6px) rotate(135deg);
	}
</style>
