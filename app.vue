<script setup lang="ts">
const accountMenu = [
	[
		{
			label: "email@example.com",
			slot: "account",
			disabled: true,
		},
	],
	[
		{
			label: "Settings",
			icon: "i-heroicons-cog-6-tooth",
		},
		{
			label: "Sign out",
			icon: "i-heroicons-arrow-right-on-rectangle",
		},
	],
];
</script>

<template>
	<div
		class="bg-gray-50/75 dark:bg-gray-950/75 backdrop-blur border-b -mb-px sticky top-0 z-50 border-gray-200 dark:border-gray-800"
	>
		<UContainer as="nav" class="py-4 flex items-center justify-between">
			<h1 class="text-xl font-semibold">PlowTheTrail.com</h1>
			<div class="flex items-center gap-2 sm:gap-4">
				<UTooltip text="New report">
					<UButton color="primary" variant="ghost" icon="i-heroicons-plus" />
				</UTooltip>
				<UDropdown
					:items="accountMenu"
					:ui="{ item: { disabled: 'cursor-text select-text' } }"
				>
					<UButton
						color="gray"
						variant="ghost"
						label="Account"
						trailing-icon="i-heroicons-chevron-down-20-solid"
					/>

					<template #account="{ item }">
						<div class="text-left">
							<p>Signed in as</p>
							<p class="truncate font-medium text-gray-900 dark:text-white">
								{{ item.label }}
							</p>
						</div>
					</template>
					<template #item="{ item }">
						<span class="truncate">{{ item.label }}</span>
						<UIcon
							:name="item.icon"
							class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto"
						/>
					</template>
				</UDropdown>
			</div>
		</UContainer>
	</div>
	<NuxtPage />
</template>

<style lang="postcss">
body {
	@apply font-sans text-gray-950 bg-gray-50 dark:bg-gray-950 dark:text-gray-50;
}
</style>
