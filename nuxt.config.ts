// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "2024-11-01",
	devtools: { enabled: true },
	typescript: { typeCheck: true },
	modules: [
		"@nuxt/eslint",
		"@nuxt/ui",
		"@pinia/nuxt",
		"@vueuse/nuxt",
		"nuxt-mapbox",
	],
	mapbox: {
		accessToken: process.env.MAPBOX_ACCESS_TOKEN,
	},
});
