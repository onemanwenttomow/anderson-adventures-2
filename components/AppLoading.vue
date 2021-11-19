<script setup>
onMounted(() => {
  // get canvas context
  var ctx = document.getElementById('game').getContext('2d');
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
  <div class="flex justify-center items-center text-gray-500 text-lg text-center h-30 w-30">
    <div class="animate-spin">
      <canvas id="game" width="16" height="16"></canvas>
    </div>
  </div>
</template>

<style scoped>
canvas {
  width: 80px;
  height: 80px;
  image-rendering: -moz-crisp-edges;
  image-rendering: -webkit-crisp-edges;
  image-rendering: pixelated;
  image-rendering: crisp-edges;
}
</style>
