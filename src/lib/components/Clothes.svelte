<script>
	import hanger from '$lib/images/hanger.png';
	export let data;
</script>

<li class="clothes">
	<img src={hanger} alt="hanger" width="200" />
	<div class="category">{data.category}</div>
	<div class="name">{data.name}</div>
</li>

<style>
	.clothes {
		text-align: center;
		margin-right: 10px;
	}
	.category {
		font-weight: bold;
	}
	.name {
		color: #666;
	}
</style>
