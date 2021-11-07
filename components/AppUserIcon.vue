<script setup lang="ts">
const props = defineProps({
  iconColor: String,
  newColor: {
    required: false,
    type: Function
  }
});
console.log("props: ", props);
</script>

<template>
  <div
    class="
      h-20
      w-20
      bg-gradient-to-tl
      m-1
      mr-4
      rounded
      outline-none
      border-2 border-transparent
      cursor-pointer
      relative
    "
    :class="iconColor"
    @click="() => newColor"
  ></div>
</template>
