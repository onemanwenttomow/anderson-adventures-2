<script setup lang="ts">
const props = defineProps({
  iconColor: String,
  newColor: {
    required: false,
    type: Function
  }
});

function changeColor() {
  if (!props.newColor) {
    return;
  }
  props.newColor();
}
</script>

<template>
  <div
    class="
      h-20
      w-20
      bg-gradient-to-tl
      rounded
      outline-none
      border-2 border-transparent
      cursor-pointer
      relative
    "
    :class="iconColor"
    @click="changeColor"
  ></div>
</template>
