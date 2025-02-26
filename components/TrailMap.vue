<script setup lang="ts">
import { Marker, type LngLat, type Map } from "mapbox-gl";

const props = defineProps<{
	center: [number, number];
	zoom: number;
}>();

const isMobile = useIsMobile();

const map = useMapboxRef("map");
const reportStore = useReportStore();
let reportMarker: Marker | undefined;

function setReportCoords(point: LngLat) {
	const [lon, lat] = point.toArray();
	reportStore.$patch({ lon, lat });
}

useMapbox("map", (map) => {
	function recenterReport(event: { target: Map }) {
		if (isMobile.value) {
			const center = event.target.getCenter();
			reportMarker?.setLngLat(center);
			setReportCoords(center);
		}
	}

	map.on("move", recenterReport);
	map.on("drag", recenterReport);
	map.on("zoom", recenterReport);
});

watch(
	() => reportStore.open,
	(open) => {
		if (open) {
			const marker = new Marker({
				anchor: "bottom",
				draggable: !isMobile.value,
			});
			marker.setLngLat(map.value!.getCenter());
			marker.addTo(map.value!);
			marker.on("dragend", () => setReportCoords(marker.getLngLat()));
			reportMarker = marker;
		} else {
			reportMarker?.remove();
			reportMarker = undefined;
		}
	},
);

watch(
	() => reportStore.submitting,
	(submitting) => {
		if (!isMobile) {
			reportMarker?.setDraggable(!submitting);
		}
	},
);

watch(isMobile, (isMobile) => reportMarker?.setDraggable(!isMobile));
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
