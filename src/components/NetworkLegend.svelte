<script lang="ts">
	const swatches = [
		{
			color: '#92BA4A',
			title: 'Completed network'
		},
		{
			color: '#CF663C',
			title: 'Planned network'
		},
		{
			color: '#3BAAB4',
			title: 'BusConnects'
		}
	];
</script>

<div class="network-legend">
	<h2>Active Travel network</h2>
	<ul>
		{#each swatches as { color, title }}
			<li>
				<span class="color-swatch" style="background:{color}" />
				<span class="color-label">{title}</span>
			</li>
		{/each}
	</ul>
</div>

<style>
	.network-legend {
		max-width: 400px;
		margin-bottom: 2em;
	}

	.color-swatch {
		display: inline-block;
		height: 4px;
		width: calc(100% / 6);
		vertical-align: middle;
		border-radius: 2px;
		margin-right: 0.2em;
	}

	.color-label {
		display: inline-block;
		vertical-align: middle;
	}

	h2 {
		font-size: inherit;
		margin: 0;
	}

	ul {
		margin: 0.2em 0;
		padding: 0;
		z-index: 1;
	}

	li {
		position: relative;
		list-style: none;
	}
</style>
