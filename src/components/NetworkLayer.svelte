<script lang="ts">
	import { getContext, onMount } from 'svelte';
	import { mapbox, key, type MapContext } from './mapbox';
	import { assets } from '$app/paths';

	const { getMap } = getContext<MapContext>(key);
	const map = getMap();

	onMount(() => {
		map.on('load', () => {
			// Layers have been added to the mapbox style for better performance
			map.setPaintProperty('activetravel-network', 'line-opacity', 0.9);

			// Add a popup to display information about the feature when the user clicks on it
			const popup = new mapbox.Popup({
				closeButton: false,
				closeOnClick: false
			});

			map.on('mousemove', 'full-network-interaction', ({ features = [], lngLat }) => {
				// Get the feature that the user is hovering over
				const { properties } = features[0];
				if (!properties) return;

				// Change the cursor style as a UI indicator
				map.getCanvas().style.cursor = 'pointer';

				const { Project_Status: status, Delivery_Phase: phase, Type: type } = properties;

				// Set the popup content
				let tooltipText = `<b>${properties.description}</b><br/>`;

				// AcT network
				if (status) {
					tooltipText += `<b class="${status === 'Complete' ? 'complete' : 'progress'}">`;
					tooltipText += `Status: ${status}</b>`;
					tooltipText += `<br>(Delivery phase: ${phase})`;
				}

				// BusConnects
				else {
					tooltipText += `<b class="bus">BusConnect</b>`;
					tooltipText += `<br>(${type} route)`;
				}

				popup.setLngLat(lngLat).setHTML(tooltipText).addTo(map);
			});

			map.on('mouseleave', 'full-network-interaction', () => {
				// Reset the cursor style when the user stops hovering over the feature
				map.getCanvas().style.cursor = '';

				// Remove the popup
				popup.remove();
			});
		});
	});
</script>

<style>
	:global(.mapboxgl-popup) {
		font-family: 'Karla', sans-serif;
		line-height: 1.3;
	}

	:global(.mapboxgl-popup .complete) {
		color: #92ba4a;
	}

	:global(.mapboxgl-popup .progress) {
		color: #cf663c;
	}

	:global(.mapboxgl-popup .bus) {
		color: #3baab4;
	}
</style>
