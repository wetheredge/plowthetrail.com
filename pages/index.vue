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

const newReport = ref("report" in query);
</script>

<template>
	<div>
		<TrailMap :center="mapCenter" :zoom="mapCenter ? 10 : 7" />
		<TopBar>
			<UTooltip text="New report">
				<UButton
					color="primary"
					variant="ghost"
					icon="i-heroicons-plus"
					@click="newReport = true"
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
					v-if="newReport"
					title="New report"
					@close="newReport = false"
				>
					<p>Drag the marker to choose a location</p>
					<NewReportForm />
				</MapPanel>
			</template>

			<template #top-right>
				<FilterPanel v-if="showFilters" @close="showFilters = false" />
			</template>
		</MapPanelContainer>
	</div>
</template>
