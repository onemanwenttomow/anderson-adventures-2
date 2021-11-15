<script setup lang="ts">
const { character } = usePlayerCharacter();
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
      flex
      justify-center
      items-center
    "
    :class="iconColor"
    @click="changeColor"
  >
    <img :src="character" alt="character" class="w-3/4" />
  </div>
</template>
