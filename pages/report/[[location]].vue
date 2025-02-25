<script setup lang="ts">
const showFilters = ref(false);
</script>

<template>
	<div>
		<TopBar>
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
				<MapPanel title="New report" @close="navigateTo('/')">
					<p>Drag the marker to choose a location</p>
					<NewReportForm />
				</MapPanel>
			</template>

			<template #top-right>
				<FilterPanel v-if="showFilters" @close="showFilters = false" />
			</template>
		</MapPanelContainer>
		<TrailMap />
	</div>
</template>
