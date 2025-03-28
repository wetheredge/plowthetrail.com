<script setup lang="ts">
defineEmits<{
	close: [];
}>();

const timePeriods = ["24h", "48h", "7d", "All"];
const timePeriod = ref(timePeriods[0]);
</script>

<template>
	<MapPanel title="Filters" @close="$emit('close')">
		<UFormGroup label="Time period:">
			<UButtonGroup>
				<UButton
					v-for="period in timePeriods"
					:key="period"
					:label="period"
					:color="period === timePeriod ? 'primary' : 'gray'"
					@click="timePeriod = period"
				/>
			</UButtonGroup>
		</UFormGroup>
	</MapPanel>
</template>
