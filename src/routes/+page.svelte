<script>
	import Map from '../components/Map.svelte';
	import ChoroplethLayer from '../components/ChoroplethLayer.svelte';
	import NetworkLayer from '../components/NetworkLayer.svelte';
	import MeassurementLayer from '../components/MeassurementLayer.svelte';
	import ChoroplethLegend from '../components/ChoroplethLegend.svelte';
	import NetworkLegend from '../components/NetworkLegend.svelte';
	import '@fontsource/karla/400.css';
	import '@fontsource/karla/700.css';

	let meassurementLayerActive = false;
</script>

<div class="map-layout">
	<div class="main">
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
	</div>

	<div class="sidebar">
		<NetworkLegend />
		<ChoroplethLegend />
	</div>
</div>

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

	.map-layout {
		height: 100vh;
		width: 100vw;
		max-width: 1200px;
	}

	.main {
		position: relative;
		height: calc(100vh - 100px);
	}

	.activate-meassurement {
		position: absolute;
		top: 10px;
		left: 10px;
		z-index: 1;
		display: flex;
	}

	@media (min-width: 784px) {
		.map-layout {
			display: flex;
			flex-direction: row;
		}
		.main {
			height: 100%;
			flex: 0 0 60%;
		}

		.sidebar {
			flex: 1;
			margin-left: 15px;
		}
	}

	@media (min-width: 800px) {
		.main {
			flex: 0 0 70%;
		}

		.sidebar {
			margin-left: 20px;
		}
	}

	@media (min-width: 1100px) {
		.main {
			flex: 0 0 80%;
		}
	}
</style>
