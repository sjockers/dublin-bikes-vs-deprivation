<script lang="ts">
	import { getContext, onMount } from 'svelte';
	import { mapbox, key, type MapContext } from './mapbox';
	import { assets } from '$app/paths';

	const { getMap } = getContext<MapContext>(key);
	const map = getMap();

	const CATEGORIES: { [key: string]: string } = {
		'Scope and Purpose': '#EF1313',
		'Design and Consultation': '#EC731B',
		'Construction and Implementation': '#3820E9',
		Complete: '#51BE51'
	};

	const colorStops: string[] = [];
	Object.entries(CATEGORIES).map(([key, value]) => {
		colorStops.push(key);
		colorStops.push(value);
	});

	onMount(() => {
		map.on('load', () => {
			map.addSource('planned-network', {
				type: 'geojson',
				data: `${assets}/data/planned_network.geojson`
			});

			map.addLayer({
				id: 'planned-network-layer',
				type: 'fill',
				source: 'planned-network',
				paint: {
					'fill-opacity': 1,
					'fill-color': ['match', ['get', 'Project_Status'], ...colorStops, '#000']
				}
			});

			// Add a popup to display information about the feature when the user clicks on it
			const popup = new mapbox.Popup({
				closeButton: false,
				closeOnClick: false
			});

			map.on('mousemove', 'planned-network-layer', ({ features = [], lngLat }) => {
				// Get the feature that the user is hovering over
				const { properties } = features[0];
				if (!properties) return;

				// Change the cursor style as a UI indicator
				map.getCanvas().style.cursor = 'pointer';

				const status: string = properties.Project_Status;
				const color = CATEGORIES[status];

				// Set the popup content
				let tooltipText = `<b>${properties.Description}</b>`;
				tooltipText += `<br>Project status: `;
				tooltipText += `<b style="color:${color}">${properties.Project_Status}</b>`;
				tooltipText += `<br>Delivery phase: ${properties.Delivery_Phase}`;
				tooltipText += `<br>Interim scheme: ${properties.Interim_Scheme}`;
				popup.setLngLat(lngLat).setHTML(tooltipText).addTo(map);
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
