<script lang="ts">
	import { choroplethScale } from '$lib/choroplethScale';
	export let choroplethDetails: { name: string; deprivationIndex: number } | null;
</script>

<div class="choropleth-legend">
	<h2>Deprivation index</h2>
	<ul>
		{#each choroplethScale as { color, title, stop }}
			<li class="legend-item" style="box-shadow: inset 0 0 1.5px {color}">
				<span class="color-swatch" {title} style="background:{color}" />
				<span class="color-label">{stop}</span>
			</li>
		{/each}
	</ul>
	<small class="label-start">← Disadvantaged</small>
	<small class="label-end">Affluent →</small>
</div>

{#if choroplethDetails}
	<div class="choropleth-details">
		<div
			class="details-item"
			style="box-shadow: inset 0 0 1.5px {choroplethDetails.category.color}"
		>
			<span class="color-swatch" style="background:{choroplethDetails.category.color}" />
		</div>
		<div>
			<h2>{choroplethDetails.name}</h2>
			<small>{choroplethDetails.category.title} ({choroplethDetails.deprivationIndex})</small>
		</div>
	</div>
{/if}

<style>
	.choropleth-legend {
		position: relative;
		overflow: hidden;
		margin-bottom: 1.2em;
	}

	.legend-item {
		flex: 1;
		position: relative;
		list-style: none;
		background: #ebebeb;
		height: 20px;
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
	.choropleth-details {
		display: none;

		@media (min-width: 660px) {
			display: flex;
		}
	}

	.details-item {
		flex: 0 0 36px;
		position: relative;
		background: #ebebeb;
		height: 30px;
		margin-right: 0.5em;
	}

	h2 {
		font-size: inherit;
		margin: 0;
		padding: 0;
		line-height: 1;
	}

	ul {
		display: flex;
		width: 100%;
		margin: 0.4em 0;
		padding: 0;
		z-index: 1;
	}

	small {
		font-size: 12px;
		line-height: 1.2;
		color: #666;
	}

	li:nth-child(3) {
		border-right: 1px solid black;
	}
</style>
