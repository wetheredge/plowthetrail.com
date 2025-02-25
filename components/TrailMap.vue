<script setup lang="ts">
const props = defineProps<{
	center: [number, number];
	zoom: number;
}>();
</script>

<template>
	<!-- FIXME: default styles contain both `position: relative` & `absolute` at equal specificity with unpredictable order -->
	<MapboxMap
		map-id="map"
		style="position: absolute"
		:options="{
			style: 'mapbox://styles/mapbox/outdoors-v12',
			center: props.center,
			zoom: props.zoom,
		}"
	>
		<MapboxGeolocateControl position="bottom-right" />
		<MapboxNavigationControl position="bottom-right" />
	</MapboxMap>
</template>
