import { defineStore } from 'pinia';

export const useOptionsStore = defineStore('options', {
  state: () => ({
    options: {
      vibration: true,
    },
  }),
  getters: {
    vibration: (state) => {
      if (
        process.client &&
        state.options.vibration &&
        typeof window.navigator.vibrate !== 'undefined'
      ) {
        return true;
      }
    },
  },
});
