<script lang="ts">
	import { choroplethScale } from '$lib/choroplethScale';
</script>

<div class="choropleth-legend">
	<h2>Deprivation index</h2>
	<ul>
		{#each choroplethScale as { color, title, stop }}
			<li style="box-shadow: inset 0 0 1.5px {color}">
				<span class="color-swatch" {title} style="background:{color}" />
				<span class="color-label">{stop}</span>
			</li>
		{/each}
	</ul>
	<small class="label-start">← Disadvantaged</small>
	<small class="label-end">Affluent →</small>
</div>

<style>
	.choropleth-legend {
		position: relative;
		overflow: hidden;
		margin-bottom: 1em;
	}

	.color-swatch {
		display: block;
		height: 100%;
		width: 100%;
		opacity: 0.4;
	}

	.color-label {
		position: absolute;
		font-size: 12px;
		top: 2px;
		left: 4px;
	}

	.label-start {
		float: left;
	}

	.label-end {
		float: right;
	}

	h2 {
		font-size: inherit;
		margin: 0;
	}

	ul {
		display: flex;
		width: 100%;
		margin: 0.4em 0 0.2em;
		padding: 0;
		z-index: 1;
	}

	small {
		font-size: 12px;
		line-height: 1.4;
	}

	li {
		position: relative;
		list-style: none;
		background: #ebebeb;
		height: 20px;
		flex: 1;
	}

	li:nth-child(3) {
		border-right: 1px solid black;
	}
</style>
