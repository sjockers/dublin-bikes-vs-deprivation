<script>
	import Map from '../components/Map.svelte';
	import ChoroplethLayer from '../components/ChoroplethLayer.svelte';
	import NetworkLayer from '../components/NetworkLayer.svelte';
	import MeassurementLayer from '../components/MeassurementLayer.svelte';
	import '@fontsource/karla/400.css';
	import '@fontsource/karla/700.css';

	let meassurementLayerActive = false;
</script>

<!-- TODO: Use bounding box instead of lat/lon? -->
<Map
	bounds={[
		[-6.3870259, 53.2987342],
		[-6.1148829, 53.4105416]
	]}
>
	<ChoroplethLayer />

	<NetworkLayer />

	{#if meassurementLayerActive}
		<MeassurementLayer />
	{:else}
		<button class="activate-meassurement" on:click={() => (meassurementLayerActive = true)}>
			Measure distance
		</button>
	{/if}

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
		background: rgb(243, 241, 235);
		font-family: 'Karla', sans-serif;
		font-size: 16px;
	}

	.activate-meassurement {
		position: absolute;
		top: 10px;
		left: 10px;
		z-index: 1;
		display: flex;
	}
</style>
