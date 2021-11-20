<script setup>
const { $supabase } = useNuxtApp();
const { handleLogout } = $supabase;
const route = useRoute();
console.log('route.path: ', route.path);
</script>

<template>
  <header class="fixed p-4 flex justify-between items-center w-full bg-gray-900 text-white">
    <div class="flex select-none cursor-pointer">
      <AppPixelCanvas src="/items/Weapon_08.png" :size="2.5" />
      <h1 class="text-4xl">AA</h1>
    </div>
    <AppBtn v-if="$route.path !== '/login'" type="primary" class="ml-auto" @click="handleLogout"
      >Logout</AppBtn
    >
  </header>
</template>
