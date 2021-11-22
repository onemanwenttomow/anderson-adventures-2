import { defineStore } from 'pinia';

export const useStore = defineStore('players', {
  state: () => {
    return {
      players: [] as Array<User>,
      playersFetched: false,
      playerSelected: {} as User,
    };
  },
});
