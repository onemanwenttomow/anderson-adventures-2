<script setup>
const { $supabase } = useNuxtApp();
const { handleLogout } = $supabase;
const route = useRoute();
const headerReady = ref(false);
console.log('route.path: ', route.path);
</script>

<template>
  <header class="fixed p-4 w-full bg-gray-900 text-white">
    <div v-show="headerReady" class="max-w-screen-lg mx-auto flex justify-between items-center">
      <nuxt-link to="/">
        <div class="flex select-none cursor-pointer">
          <AppPixelCanvas src="/items/Weapon_08.png" :size="2.5" @imgloaded="headerReady = true" />
          <h1 class="text-4xl">AA</h1>
        </div>
      </nuxt-link>
      <AppBtn v-if="$route.path !== '/login'" type="primary" class="ml-auto" @click="handleLogout"
        >Logout</AppBtn
      >
    </div>
  </header>
</template>
