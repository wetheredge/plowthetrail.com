import { defineStore } from "pinia";

export const useDraftReport = defineStore("draft-report", {
	state: () => ({
		open: false,
		submitting: false,
		lat: 0,
		lon: 0,
		condition: undefined as number | undefined,
		notes: "",
		showErrors: false,
	}),
	actions: {
		hide() {
			this.$reset();
		},
		show() {
			this.open = true;
		},
	},
});
