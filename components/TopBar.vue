<script setup lang="ts">
defineProps<{
	title?: string;
}>();

const accountMenu = [
	[{ label: "email@example.com", slot: "account", disabled: true }],
	[
		{ label: "Settings", icon: "i-heroicons-cog-6-tooth" },
		{ label: "Sign out", icon: "i-heroicons-arrow-right-on-rectangle" },
	],
];
</script>

<template>
	<nav
		class="sticky top-0 z-50 -mb-px p-4 flex items-center justify-between glass border-b"
	>
		<h1 class="text-xl font-semibold">{{ title ?? "PlowTheTrail.com" }}</h1>
		<div class="flex items-center gap-2">
			<slot />

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
	</nav>
</template>
