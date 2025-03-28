<script setup lang="ts">
import { Marker, type LngLat, type Map } from "mapbox-gl";
import { Condition } from "#shared/condition";

const props = defineProps<{
	center: [number, number];
	zoom: number;
}>();

const isMobile = useIsMobile();

const map = useMapboxRef("map");
const draftReport = useDraftReport();
let draftReportMarker: Marker | undefined;

function setReportCoords(point: LngLat) {
	const [lon, lat] = point.toArray();
	draftReport.$patch({ lon, lat });
}

useMapbox("map", async (map) => {
	function recenterReport(event: { target: Map }) {
		if (isMobile.value) {
			const center = event.target.getCenter();
			draftReportMarker?.setLngLat(center);
			setReportCoords(center);
		}
	}

	map.on("move", recenterReport);
	map.on("drag", recenterReport);
	map.on("zoom", recenterReport);

	// FIXME: these should be resolved from the tailwind config or a css var
	const colors = {
		[Condition.Unusable]: "#ef4444", // red 500
		[Condition.Poor]: "#f59e0b", // amber 500
		[Condition.Passable]: "#60a5fa", // blue 500
		[Condition.Excellent]: "#10b981", // emerald 500
	};

	const reports = await $fetch("/api/reports");
	for (const report of reports) {
		new Marker({
			color: colors[report.condition],
			anchor: "bottom",
		})
			.setLngLat([report.lon, report.lat])
			.addTo(map);
	}
});

watch(
	() => draftReport.open,
	(open) => {
		if (open) {
			const center = map.value!.getCenter();
			setReportCoords(center);

			const computedStyle = getComputedStyle(document.documentElement);
			const marker = new Marker({
				color: `rgb(${computedStyle.getPropertyValue("--color-primary-DEFAULT")})`,
				anchor: "bottom",
				draggable: !isMobile.value,
			});
			marker.setLngLat(center);
			marker.addTo(map.value!);
			marker.on("dragend", () => setReportCoords(marker.getLngLat()));
			draftReportMarker = marker;
		} else {
			draftReportMarker?.remove();
			draftReportMarker = undefined;
		}
	},
);

watch(
	() => draftReport.submitting,
	(submitting) => {
		if (!isMobile) {
			draftReportMarker?.setDraggable(!submitting);
		}
	},
);

watch(isMobile, (isMobile) => draftReportMarker?.setDraggable(!isMobile));
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
