<script setup lang="ts">
const showFilters = ref(false);

const query = useRoute().query;

const queryCoord = (key: string) => {
	let raw = query[key];
	if (Array.isArray(raw)) {
		raw = raw[0];
	}
	if (raw != null) {
		return Number.parseFloat(raw);
	}
};
const queryLon = queryCoord("lon");
const queryLat = queryCoord("lat");

const mapCenter: [number, number] =
	queryLon != null && queryLat != null
		? [queryLon, queryLat]
		: [-68.137343, 45.137451];

const map = useTemplateRef("map");
const reportStore = useReportStore();

function submitReport() {
	reportStore.submitting = true;
	const report = {
		lat: reportStore.lat,
		lon: reportStore.lon,
		condition: reportStore.condition,
		notes: reportStore.notes,
	};
	setTimeout(() => {
		console.log("new report", report);
		reportStore.open = false;
	}, 2000);
}
</script>

<template>
	<div>
		<TrailMap ref="map" :center="mapCenter" :zoom="mapCenter ? 10 : 7" />
		<TopBar>
			<UTooltip text="New report">
				<UButton
					color="primary"
					variant="ghost"
					icon="i-heroicons-plus"
					@click="reportStore.show"
				/>
			</UTooltip>
			<UTooltip text="Toggle filters panel">
				<UButton
					color="gray"
					variant="ghost"
					icon="i-heroicons-funnel"
					@click="showFilters = !showFilters"
				/>
			</UTooltip>
		</TopBar>
		<MapPanelContainer>
			<template #top-left>
				<!-- TODO: fix width changing with help text -->
				<MapPanel
					v-if="reportStore.open"
					title="New report"
					@close="reportStore.open = false"
				>
					<p>Drag the marker to choose a location</p>
					<NewReportForm />
					<UButton
						label="Submit"
						:loading="reportStore.submitting"
						@click="submitReport"
					/>
				</MapPanel>
			</template>

			<template #top-right>
				<FilterPanel v-if="showFilters" @close="showFilters = false" />
			</template>
		</MapPanelContainer>
	</div>
</template>
