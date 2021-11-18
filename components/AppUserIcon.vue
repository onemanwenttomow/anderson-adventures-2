<script setup lang="ts">
const props = defineProps({
  iconColor: String,
  character: String,
  newColor: {
    required: false,
    type: Function,
  },
  newCharacter: {
    required: false,
    type: Function,
  },
});

function changeColor() {
  if (!props.newColor) {
    return;
  }
  props.newColor();
}

function changeCharacter() {
  if (!props.newCharacter) {
    return;
  }
  props.newCharacter();
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
      select-none
    "
    :class="iconColor"
    @click="changeColor"
  >
    <img :src="character" alt="character" class="w-3/4 select-none" @click.stop="changeCharacter" />
  </div>
</template>
