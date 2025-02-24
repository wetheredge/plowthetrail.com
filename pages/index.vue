<script setup lang="ts">
const showFilters = ref(false);
</script>

<template>
	<div>
		<TopBar>
			<UTooltip text="New report">
				<UButton color="primary" variant="ghost" icon="i-heroicons-plus" />
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
		<FilterPanel v-if="showFilters" @close="showFilters = false" />
		<TrailMap />
	</div>
</template>
