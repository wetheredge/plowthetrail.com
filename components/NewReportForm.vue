<script setup lang="ts">
import type { Condition } from "#shared/condition";

const store = useDraftReport();

type ConditionOption = {
	value?: Condition;
	label: string;
	help: string;
	disabled?: boolean;
};

const conditions = [
	{ label: "", help: "", disabled: true },
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
] satisfies ConditionOption[];

const help = computed(() => {
	return conditions.find((c) => c.value == store.condition)?.help ?? "";
});
</script>

<template>
	<UFormGroup
		label="Current conditions"
		required
		:help
		:error="store.showErrors && store.condition == null"
	>
		<USelect v-model.number="store.condition" :options="conditions" />
	</UFormGroup>
	<UFormGroup label="Notes">
		<UTextarea v-model="store.notes" autoresize :maxrows="5" />
	</UFormGroup>
</template>
