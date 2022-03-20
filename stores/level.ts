import { defineStore } from 'pinia';
export const useLevelStore = defineStore('level', {
	state: () => {
		return {
			level: 0,
			timesTables: [[10]]
		};
	},
});
