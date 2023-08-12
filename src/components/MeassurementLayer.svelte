<script>
	import { getContext, onMount } from 'svelte';
	import { mapbox, key } from './mapbox.js';
	import length from '@turf/length';
	import { assets } from '$app/paths';

	const { getMap } = getContext(key);
	const map = getMap();
	let distance = 0;
	let coordinates = [];

	// GeoJSON object to hold our measurement features
	const geojson = {
		type: 'FeatureCollection',
		features: []
	};

	// Used to draw a line between points
	const linestring = {
		type: 'Feature',
		geometry: {
			type: 'LineString',
			coordinates
		}
	};

	onMount(() => {
		map.addSource('geojson', {
			type: 'geojson',
			data: geojson
		});

		// Add styles to the map
		map.addLayer({
			id: 'measure-points',
			type: 'circle',
			source: 'geojson',
			paint: {
				'circle-radius': 5,
				'circle-color': '#000'
			},
			filter: ['in', '$type', 'Point']
		});
		map.addLayer({
			id: 'measure-lines',
			type: 'line',
			source: 'geojson',
			layout: {
				'line-cap': 'round',
				'line-join': 'round'
			},
			paint: {
				'line-color': '#000',
				'line-width': 2.5
			},
			filter: ['in', '$type', 'LineString']
		});

		map.on('click', (e) => {
			const features = map.queryRenderedFeatures(e.point, {
				layers: ['measure-points']
			});

			// Remove the linestring from the group
			// so we can redraw it based on the points collection.
			if (geojson.features.length > 1) geojson.features.pop();

			// Clear the distance container to populate it with a new value.
			// TODO: distanceContainer.innerHTML = '';

			// If a feature was clicked, remove it from the map.
			if (features.length) {
				const id = features[0].properties.id;
				geojson.features = geojson.features.filter((point) => point.properties.id !== id);
			} else {
				const point = {
					type: 'Feature',
					geometry: {
						type: 'Point',
						coordinates: [e.lngLat.lng, e.lngLat.lat]
					},
					properties: {
						id: String(new Date().getTime())
					}
				};

				geojson.features.push(point);
			}

			if (geojson.features.length > 1) {
				linestring.geometry.coordinates = geojson.features.map(
					(point) => point.geometry.coordinates
				);

				geojson.features.push(linestring);

				// Populate the distanceContainer with total distance
				// const value = document.createElement('pre');
				distance = length(linestring);
				// value.textContent = `Total distance: ${distance.toLocaleString()}km`;

				// TODO: distanceContainer.appendChild(value);
			}

			map.getSource('geojson').setData(geojson);
		});
	});

	map.on('mousemove', (e) => {
		const features = map.queryRenderedFeatures(e.point, {
			layers: ['measure-points']
		});
		// Change the cursor to a pointer when hovering over a point on the map.
		// Otherwise cursor is a crosshair.
		map.getCanvas().style.cursor = features.length ? 'pointer' : 'crosshair';
	});

	function clear() {
		geojson.features = [];
		map.getSource('geojson').setData(geojson);
		distance = 0;
	}
</script>

<div class="distance-container">
	<pre>Meassured distance: {distance.toLocaleString()}km</pre>
	{#if distance > 0}
		<button on:click={clear}>Reset</button>
	{/if}
</div>

<style>
	.distance-container {
		position: absolute;
		top: 10px;
		left: 10px;
		z-index: 1;
		display: flex;
	}

	.distance-container pre {
		background-color: rgba(0, 0, 0, 0.5);
		color: #fff;
		font-size: 11px;
		line-height: 18px;
		display: block;
		margin: 0 5px 0 0;
		padding: 5px 10px;
		border-radius: 3px;
	}
</style>
