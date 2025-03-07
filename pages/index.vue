<script setup lang="ts">
const toast = useToast();
const isMobile = useIsMobile();

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

async function submitReport() {
	if (reportStore.condition == null) {
		reportStore.showErrors = true;
		return;
	}

	reportStore.submitting = true;
	try {
		const report = await $fetch(`/api/reports`, {
			method: "POST",
			body: {
				lat: reportStore.lat,
				lon: reportStore.lon,
				condition: reportStore.condition,
				notes: reportStore.notes.trim(),
			},
		});

		console.log("new report", report);
		reportStore.hide();
		toast.add({
			id: "report-submitted",
			title: "Report submitted!",
		});
	} catch (err) {
		console.error(`Failed to submit report: ${err}`);
		reportStore.submitting = false;
		toast.add({
			id: "report-failed",
			title: "Report failed",
		});
	}
}
</script>

<template>
	<div>
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
		<div
			:class="[
				$style.sheet,
				{ [$style.open]: reportStore.open && isMobile },
				'fixed w-full z-10 p-4 flex flex-col gap-3 glass border',
			]"
		>
			<div class="grid grid-cols-3 gap-2">
				<UButton
					color="gray"
					variant="ghost"
					icon="i-heroicons-x-mark"
					class="mr-auto"
					@click="reportStore.hide"
				/>
				<span class="font-semibold text-center">New report</span>
				<UButton
					label="Submit"
					class="ml-auto"
					:loading="reportStore.submitting"
					@click="submitReport"
				/>
			</div>

			<div class="flex flex-col gap-[inherit] overflow-y-scroll">
				<p>Drag the map to choose a location</p>
				<NewReportForm />
			</div>
		</div>
		<TrailMap ref="map" :center="mapCenter" :zoom="mapCenter ? 10 : 7" />
		<MapPanelContainer>
			<template #top-left>
				<!-- TODO: fix width changing with help text -->
				<MapPanel
					v-if="reportStore.open && !isMobile"
					title="New report"
					@close="reportStore.hide"
				>
					<p>Drag the marker to choose a location</p>
					<NewReportForm />
					<UButton
						label="Submit"
						block
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

<style module lang="postcss">
.sheet {
	height: 40vh;
	bottom: -40vh;

	&.open {
		bottom: 0;
	}
}

.sheet,
:has(.sheet)
	:global(
		#map
			:is(
				.mapboxgl-ctrl-bottom-left,
				.mapboxgl-ctrl-bottom,
				.mapboxgl-ctrl-bottom-right
			)
	) {
	transition: bottom theme(transitionDuration.DEFAULT)
		theme(transitionTimingFunction.DEFAULT);
}

:has(.sheet.open)
	:global(
		#map
			:is(
				.mapboxgl-ctrl-bottom-left,
				.mapboxgl-ctrl-bottom,
				.mapboxgl-ctrl-bottom-right
			)
	) {
	bottom: 40vh;
}
</style>
