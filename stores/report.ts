import { defineStore } from "pinia";

const init = {
	open: false,
	submitting: false,
	lat: 0,
	lon: 0,
	condition: undefined,
	notes: "",
};

export const useReportStore = defineStore("report", {
	state: () => init,
	actions: {
		show() {
			this.$patch({
				...init,
				open: true,
			});
		},
	},
});
