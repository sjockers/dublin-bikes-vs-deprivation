<script lang="ts">
	import { getContext, onMount } from 'svelte';
	import { mapbox, key, type MapContext } from './mapbox';
	import { choroplethScale } from '$lib/choroplethScale';

	export let showDetails: (details: any) => void;

	const { getMap } = getContext<MapContext>(key);
	const map = getMap();

	function getCategory(value: number) {
		for (let i = 0; i < choroplethScale.length; i++) {
			if (value <= choroplethScale[i].stop) {
				return choroplethScale[i - 1];
			}
		}
		return { color: '#dadada', title: 'unknown' };
	}

	function getStepsFromCategories() {
		const stops = [];
		for (let i = 0; i < choroplethScale.length; i++) {
			stops.push(choroplethScale[i].color);
			const upperBound = choroplethScale[i + 1];
			if (upperBound) stops.push(upperBound.stop);
		}
		return stops;
	}

	onMount(() => {
		map.on('load', () => {
			// The layer 'deprivation-by-ed' is a choropleth layer that contains the deprivation index
			// It has been added to the mapbox studio style for better performance
			map.setPaintProperty('deprivation-by-ed', 'fill-opacity', 0.35);
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

				showDetails({
					name: properties.ED_Name,
					deprivationIndex: properties.HP2016rel,
					category: getCategory(properties.HP2016rel)
				});
			});

			map.on('mouseleave', 'deprivation-by-ed', () => {
				// Remove the details
				showDetails(null);
			});
		});
	});
</script>
