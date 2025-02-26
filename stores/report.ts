import { defineStore } from "pinia";

export const useReportStore = defineStore("report", {
	state: () => ({
		open: false,
		submitting: false,
		lat: 0,
		lon: 0,
		condition: undefined,
		notes: "",
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
