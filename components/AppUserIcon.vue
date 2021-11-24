<script setup lang="ts">
import { useOptionsStore } from '~/stores/options';
const { vibration } = useOptionsStore();
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
  height: {
    type: String,
    default: 'h-20',
  },
  width: {
    type: String,
    default: 'w-20',
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
    :class="[iconColor, height, width]"
    @click="changeColor"
  >
    <img :src="character" alt="character" class="w-3/4 select-none" @click="changeCharacter" />
  </div>
</template>
