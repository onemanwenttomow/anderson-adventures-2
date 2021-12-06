import { defineStore } from 'pinia';
export const usePlayersStore = defineStore('players', {
  state: () => {
    return {
      players: [] as Array<User>,
      playersFetched: false,
      playerSelected: {} as User,
    };
  },
});
