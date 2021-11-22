<script setup lang="ts">
const canvas = ref(null);
const props = defineProps({
  src: String,
  size: Number,
});
const emit = defineEmits(['imgloaded']);

onMounted(() => {
  const ctx = canvas.value.getContext('2d');
  const image = new Image();
  image.onload = function () {
    ctx.drawImage(image, 0, 0);
    emit('imgloaded');
  };
  image.src = props.src;
});
</script>

<template>
  <canvas v-once ref="canvas" width="16" height="16"></canvas>
</template>

<style scoped>
canvas {
  width: calc(16px * v-bind(size));
  height: calc(16px * v-bind(size));
  image-rendering: -moz-crisp-edges;
  image-rendering: -webkit-crisp-edges;
  image-rendering: pixelated;
  image-rendering: crisp-edges;
}
</style>
