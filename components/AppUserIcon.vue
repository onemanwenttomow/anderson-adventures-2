<script setup lang="ts">
import { useStore } from '~/stores/options';
const { vibration } = useStore();
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
  vibration && window.navigator.vibrate(100);
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
    <img :src="character" alt="character" class="w-3/4 select-none" @click="changeCharacter" />
  </div>
</template>
