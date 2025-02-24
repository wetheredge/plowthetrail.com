<script setup lang="ts">
const emit = defineEmits<{
	close: void;
}>();

const timePeriods = ["24h", "48h", "7d", "All"];
const timePeriod = ref(timePeriods[0]);
</script>

<template>
	<div class="relative z-10 w-fit m-4 ml-auto p-4 glass border rounded-md">
		<div class="flex justify-between gap-2 mb-2">
			<span class="font-semibold">Filters</span>
			<UButton
				color="gray"
				variant="ghost"
				icon="i-heroicons-x-mark"
				@click="$emit('close')"
			/>
		</div>

		<UFormGroup label="Time period:">
			<UButtonGroup>
				<UButton
					v-for="period in timePeriods"
					:label="period"
					:color="period === timePeriod ? 'primary' : 'gray'"
					@click="timePeriod = period"
				/>
			</UButtonGroup>
		</UFormGroup>
	</div>
</template>
