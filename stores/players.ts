import { defineStore } from 'pinia';

export const useStore = defineStore('players', {
  state: () => {
    return {
      players: [],
      playersFetched: false,
    };
  },
});
