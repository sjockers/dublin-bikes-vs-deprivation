<script>
	import { getContext, onMount } from 'svelte';
	import { mapbox, key } from './mapbox.js';
	import { assets } from '$app/paths';

	const { getMap } = getContext(key);
	const map = getMap();

	// Original labeling suggestions based on:
	// http://trutzhaase.eu/wp/wp-content/uploads/The-2016-Pobal-HP-Deprivation-Index-Introduction-07.pdf
	// ----------------------------------
	// bin, description, color
	// over 30, extremely affluent, dark blue
	// 20 to 30, very affluent medium, blue
	// 10 to 20, affluent, medium green
	// 0 to 10, marginally above average, light green
	// 0 to -10, marginally below average, light yellow
	// -10 to -20, disadvantaged medium, yellow
	// -20 to -30, very disadvantaged, orange
	// below -30, extremely disadvantaged, red

	const categories = [
		{
			stop: -Infinity,
			range: 'below -30',
			title: 'extremely disadvantaged',
			color: '#FE0000' // 'red'
		},
		{
			stop: -30,
			range: '-20 to -30',
			title: 'very disadvantaged',
			color: '#FF8031' // 'orange'
		},
		{
			stop: -20,
			range: '-10 to -20',
			title: 'disadvantaged',
			color: '#FED070' // 'medium yellow'
		},
		{
			stop: -10,
			range: '0 to -10',
			title: 'marginally below average',
			color: '#FFFEA1' // 'light yellow'
		},
		{
			stop: 0,
			range: '0 to 10',
			title: 'marginally above average',
			color: '#A0FFA0' // 'light green'
		},
		{
			stop: 10,
			range: '10 to 20',
			title: 'affluent',
			color: '#00C0C1' // 'medium green'
		},
		{
			stop: 20,
			range: '20 to 30',
			title: 'very affluent ',
			color: '#3075FE' // 'medium blue'
		},
		{
			stop: 30,
			range: 'over 30',
			title: 'extremely affluent',
			color: '#3075FE' // 'dark blue'
		}
	];

	const stops = categories.map(({ stop, color }) => [stop, color]);

	onMount(() => {
		map.on('load', () => {
			map.addSource('choropleth', {
				type: 'geojson',
				data: `${assets}/data/deprivation_by_ed.geojson`
			});

			map.addLayer({
				id: 'choropleth-layer',
				type: 'fill',
				source: 'choropleth',
				paint: {
					'fill-color': {
						property: 'HP2016rel',
						stops
					},
					'fill-opacity': 0.5
				}
			});

			// Add a popup to display information about the feature when the user clicks on it
			const popup = new mapbox.Popup({
				closeButton: false,
				closeOnClick: false
			});

			map.on('mousemove', 'choropleth-layer', (e) => {
				// Change the cursor style as a UI indicator
				map.getCanvas().style.cursor = 'pointer';

				// Get the feature that the user is hovering over
				const { properties } = e.features[0];

				// Set the popup content
				const tooltipText = `<b>${properties.ED_Name}:</b> ${properties.HP2016rel}`;
				popup.setLngLat(e.lngLat).setHTML(tooltipText).addTo(map);
			});

			map.on('mouseleave', 'choropleth-layer', () => {
				// Reset the cursor style when the user stops hovering over the feature
				map.getCanvas().style.cursor = '';

				// Remove the popup
				popup.remove();
			});
		});
	});
</script>
