<script>
	import Map from '../components/Map.svelte';
	import ChoroplethLayer from '../components/ChoroplethLayer.svelte';
	import NetworkLayer from '../components/NetworkLayer.svelte';
</script>

<!-- TODO: Use bounding box instead of lat/lon? -->
<Map
	bounds={[
		[-6.3870259, 53.2987342],
		[-6.1148829, 53.4105416]
	]}
>
	<!-- TODO: Add extra layer for map labels? -->
	<ChoroplethLayer />

	<NetworkLayer />

	<!-- TODO: Add bike path layer here -->

	<!-- TODO: Add bus connect layer (?) -->

	<!-- TODO: Add choropleth layer (deprivation) -->
</Map>

<style>
	:global(html, body) {
		min-height: 100vh;
		margin: 0;
		padding: 0;
		width: 100%;
		border: none;
	}
</style>
