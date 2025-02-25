<script setup lang="ts">
defineEmits<{
	close: [];
}>();

defineProps<{
	title: string;
}>();
</script>

<template>
	<div
		class="relative z-10 w-fit max-w-xs p-4 flex flex-col gap-3 glass border rounded-md"
	>
		<div class="flex justify-between gap-2">
			<span class="font-semibold">{{ title }}</span>
			<UButton
				color="gray"
				variant="ghost"
				icon="i-heroicons-x-mark"
				@click="$emit('close')"
			/>
		</div>

		<slot />
	</div>
</template>
