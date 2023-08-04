<script>
	import { getContext, onMount } from 'svelte';
	import { mapbox, key } from './mapbox.js';

	const { getMap } = getContext(key);
	const map = getMap();

	onMount(() => {
		map.on('load', () => {
			map.addSource('planned-network', {
				type: 'geojson',
				data: '/data/planned_network.geojson'
			});

			map.addLayer({
				id: 'planned-network-layer',
				type: 'fill',
				source: 'planned-network',
				paint: {
					'fill-color': '#f00',
					'fill-opacity': 0.5
				}
			});

			// Add a popup to display information about the feature when the user clicks on it
			const popup = new mapbox.Popup({
				closeButton: false,
				closeOnClick: false
			});

			map.on('mousemove', 'planned-network-layer', (e) => {
				// Change the cursor style as a UI indicator
				map.getCanvas().style.cursor = 'pointer';

				// Get the feature that the user is hovering over
				const { properties } = e.features[0];

				// Set the popup content
				let tooltipText = `<b>${properties.Description}</b>`;
				tooltipText += `<br>Delivery phase: ${properties.Delivery_Phase}`;
				tooltipText += `<br>Project status: ${properties.Project_Status}`;
				tooltipText += `<br>Interim scheme: ${properties.Interim_Scheme}`;
				popup.setLngLat(e.lngLat).setHTML(tooltipText).addTo(map);
			});

			map.on('mouseleave', 'planned-network-layer', () => {
				// Reset the cursor style when the user stops hovering over the feature
				map.getCanvas().style.cursor = '';

				// Remove the popup
				popup.remove();
			});
		});
	});
</script>
