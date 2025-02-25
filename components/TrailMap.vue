<script setup lang="ts">
import { Marker } from "mapbox-gl";

const props = defineProps<{
	center: [number, number];
	zoom: number;
}>();

const map = useMapboxRef("map");
const reportStore = useReportStore();

let reportMarker: Marker | undefined;
watch(
	() => reportStore.open,
	(open) => {
		if (open) {
			const marker = new Marker({
				anchor: "bottom",
				draggable: true,
			});
			marker.setLngLat(map.value!.getCenter());
			marker.addTo(map.value!);
			marker.on("dragend", () => {
				const [lon, lat] = marker.getLngLat().toArray();
				reportStore.$patch({ lon, lat });
			});
			reportMarker = marker;
		} else {
			reportMarker?.remove();
			reportMarker = undefined;
		}
	},
);

watch(
	() => reportStore.submitting,
	(submitting) => reportMarker?.setDraggable(!submitting),
);
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
