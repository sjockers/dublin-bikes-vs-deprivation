<script lang="ts">
	import { onDestroy, onMount, setContext } from 'svelte';
	import { mapbox, key } from './mapbox';
	import type mapboxgl from 'mapbox-gl';
	import 'mapbox-gl/dist/mapbox-gl.css';

	interface MapboxContext {
		getMap: () => mapboxgl.Map;
	}

	const mapboxContext: MapboxContext = {
		getMap: () => map
	};

	setContext(key, mapboxContext);

	export let zoom: number = 15;
	export let maxZoom: number = 17;
	export let minZoom: number = 11;
	export let center: mapbox.LngLatLike | undefined = undefined;
	export let bounds: mapbox.LngLatBoundsLike | undefined = undefined;

	let container: HTMLDivElement;
	let map: mapbox.Map;

	onMount(() => {
		map = new mapbox.Map({
			container,
			style: 'mapbox://styles/dublininquirer/clm9i8cn6014y01nz6lym1sro',
			zoom,
			center,
			bounds,
			maxZoom,
			minZoom
		});

		// Disable interactions
		map.scrollZoom.disable();
		map.dragRotate.disable();

		// Add navigation controls
		const nav = new mapbox.NavigationControl({ showCompass: false });
		map.addControl(nav, 'top-right');
	});

	onDestroy(() => {
		if (map) map.remove();
	});
</script>

<div class="map" bind:this={container}>
	{#if map}
		<slot />
	{/if}
</div>

<style>
	.map {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 0;
	}

	.map:before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		display: block;
		z-index: 10;
		pointer-events: none;
		box-shadow: inset 0px 0px 30px 5px rgba(0, 0, 0, 0.2);
	}
</style>
