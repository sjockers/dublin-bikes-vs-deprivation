<script lang="ts">
	import { onDestroy, onMount, setContext } from 'svelte';
	import { mapbox, key } from './mapbox.js';
	import 'mapbox-gl/dist/mapbox-gl.css';

	setContext(key, {
		getMap: () => map
	});

	export let lat: number;
	export let lon: number;
	export let zoom: number = 8;

	let container: HTMLDivElement;
	let map: mapbox.Map;

	onMount(() => {
		map = new mapbox.Map({
			container,
			style: 'mapbox://styles/mapbox/light-v9',
			center: [lon, lat],
			zoom
		});
	});

	onDestroy(() => {
		if (map) map.remove();
	});
</script>

<div class="map-container" bind:this={container}>
	{#if map}
		<slot />
	{/if}
</div>

<style>
	.map-container {
		width: 100%;
		height: 100vh;
		position: relative;
	}
</style>