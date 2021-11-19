<script setup>
const { $supabase } = useNuxtApp();
const { handleLogout } = $supabase;
const route = useRoute();
console.log('route.path: ', route.path);
onMounted(() => {
  // get canvas context
  var ctx = document.getElementById('logo').getContext('2d');
  // load image
  var image = new Image();
  image.onload = function () {
    // draw the image into the canvas
    ctx.drawImage(image, 0, 0);
  };
  image.src = '/items/Weapon_08.png';
});
</script>

<template>
  <header class="fixed p-4 flex justify-between items-center w-full bg-gray-900 text-white">
    <div class="flex select-none cursor-pointer">
      <canvas id="logo" width="16" height="16"></canvas>
      <h1 class="text-4xl">AA</h1>
    </div>
    <AppBtn v-if="$route.path !== '/login'" type="primary" class="ml-auto" @click="handleLogout"
      >Logout</AppBtn
    >
  </header>
</template>

<style scoped>
canvas {
  width: 40px;
  height: 40px;
  image-rendering: -moz-crisp-edges;
  image-rendering: -webkit-crisp-edges;
  image-rendering: pixelated;
  image-rendering: crisp-edges;
}
</style>
