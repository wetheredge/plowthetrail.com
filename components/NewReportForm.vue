<script setup lang="ts">
type Condition = {
	value: number;
	label: string;
	help: string;
};

const conditionOptions = [
	{ value: 3, label: "Excellent", help: "Clear of snow and ice" },
	{ value: 2, label: "Passable", help: "Some uneven or icy sections" },
	{
		value: 1,
		label: "Poor",
		help: "Deep snow, ice patches, or rough conditions",
	},
	{
		value: 0,
		label: "Unusable",
		help: "Impassable due to deep snow, ice, or other hazards",
	},
] satisfies Condition[];

const condition = ref();
const help = computed(() => {
	return conditionOptions.find((c) => c.value == condition.value)?.help ?? "";
});
</script>

<template>
	<UFormGroup label="Current conditions" :help required>
		<USelect v-model="condition" :options="conditionOptions" />
	</UFormGroup>
</template>
