import { defineStore } from 'pinia';
export const useLevelStore = defineStore('level', {
	state: () => {
		return {
			level: 0,
			timesTables: [
            [ 10 ],
            [ 2 , 5 ],
            [ 3 , 4 ],
            [ 6 , 8 ],
            [ 6 , 7 , 9]
        ],
		};
	},
	actions: {
		increaseLevel() {
      this.level++
    }
	},
	getters: {
    currentTimesTable: (state) => state.timesTables[state.level][Math.floor(Math.random() * state.timesTables[state.level].length)],
  },
});
