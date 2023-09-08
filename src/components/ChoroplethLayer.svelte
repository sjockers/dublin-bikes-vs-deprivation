<script lang="ts">
	import { getContext, onMount } from 'svelte';
	import { mapbox, key, type MapContext } from './mapbox';
	import { assets } from '$app/paths';

	const { getMap } = getContext<MapContext>(key);
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

	const CATEGORIES = [
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

	function getCategory(value: number) {
		for (let i = 0; i < CATEGORIES.length; i++) {
			if (value <= CATEGORIES[i].stop) {
				return CATEGORIES[i - 1];
			}
		}
		return { color: '#dadada', title: 'unknown' };
	}

	function getStepsFromCategories() {
		const stops = [];
		for (let i = 0; i < CATEGORIES.length; i++) {
			stops.push(CATEGORIES[i].color);
			const upperBound = CATEGORIES[i + 1];
			if (upperBound) stops.push(upperBound.stop);
		}
		return stops;
	}

	onMount(() => {
		map.on('load', () => {
			// The layer 'deprivation-by-ed' is a choropleth layer that contains the deprivation index
			// It has been added to the mapbox studio style for better performance
			map.setPaintProperty('deprivation-by-ed', 'fill-opacity', 0.25);
			map.setPaintProperty('deprivation-by-ed', 'fill-color', [
				'step',
				['get', 'HP2016rel'],
				...getStepsFromCategories()
			]);

			// Add a popup to display information about the feature when the user clicks on it
			const popup = new mapbox.Popup({
				closeButton: false,
				closeOnClick: false
			});

			map.on('mousemove', 'deprivation-by-ed', ({ features = [], lngLat }) => {
				// Get the feature that the user is hovering over
				const { properties } = features[0];
				if (!properties) return;

				// Change the cursor style as a UI indicator
				map.getCanvas().style.cursor = 'pointer';

				// Get the category
				const { color, title } = getCategory(properties.HP2016rel);

				// Set the popup content
				let tooltipText = `<b>${properties.ED_Name}:</b>`;
				tooltipText += `<br>Deprivation index: ${properties.HP2016rel}`;
				tooltipText += `<br><b style="background:${color}">${title}</b>`;
				popup.setLngLat(lngLat).setHTML(tooltipText).addTo(map);
			});

			map.on('mouseleave', 'deprivation-by-ed', () => {
				// Reset the cursor style when the user stops hovering over the feature
				map.getCanvas().style.cursor = '';

				// Remove the popup
				popup.remove();
			});
		});
	});
</script>
