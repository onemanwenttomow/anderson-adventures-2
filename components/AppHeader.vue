<script setup lang="ts">
import { useOptionsStore } from '~/stores/options';
import { usePlayersStore } from '~/stores/players';

const { vibration } = useOptionsStore();
const store = usePlayersStore();

const { $supabase, $howler } = useNuxtApp();
const { handleLogout } = $supabase;
const route = useRoute();

const headerReady = ref(false);
const playerSelected = ref<User>(null);
console.log('route.path: ', route.path);
console.log('store: ', store);

function logout() {
  $howler.ok.play();
  vibration && window.navigator.vibrate(10);
  handleLogout();
}

store.$subscribe(() => {
  playerSelected.value = store.playerSelected;
});
</script>

<template>
  <header class="fixed w-full bg-gray-900 text-white h-18 z-50">
    <div v-show="headerReady" class="p-4 max-w-screen-lg mx-auto flex items-center">
      <nuxt-link to="/">
        <div class="flex select-none cursor-pointer">
          <AppPixelCanvas src="/items/Weapon_08.png" :size="2.5" @imgloaded="headerReady = true" />
          <h1 class="text-4xl">AA</h1>
        </div>
      </nuxt-link>
      <div class="ml-auto flex">
        <p v-if="playerSelected?.character" class="pr-4">
          <AppUserIcon
            :icon-color="playerSelected.color"
            :character="playerSelected.character"
            height="h-10"
            width="w-10"
          />
        </p>
        <AppBtn v-if="$route.path !== '/login'" type="primary" @click="logout">Logout</AppBtn>
      </div>
    </div>
  </header>
</template>
