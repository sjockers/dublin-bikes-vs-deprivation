<script>
	import Map from '../components/Map.svelte';
</script>

<Map lat={35} lon={-84} zoom={3.5} />

<style>
	:global(html, body) {
		min-height: 100vh;
		margin: 0;
		padding: 0;
		width: 100%;
		border: none;
	}
</style>
