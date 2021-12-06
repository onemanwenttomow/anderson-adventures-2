<script setup lang="ts">
import { usePlayersStore } from '~/stores/players';
import { useOptionsStore } from '~/stores/options';

const { $howler } = useNuxtApp();
const { playerSelected } = usePlayersStore();
const { vibration } = useOptionsStore();

const shake = ref('');

function handleDamage() {
  $howler.hit.play();
  shake.value = 'shake';
  setTimeout(() => (shake.value = ''), 500);
  vibration && window.navigator.vibrate(500);
}
</script>

<template>
  <AppPageWrapper class="px-4">
    <div class="flex justify-between">
      <div class="w-35 p-2 border-2 border-light-200 rounded">
        <AppUserIcon
          :character="playerSelected.character"
          height="h-30"
          width="w-30"
          class="flip"
        />
        <div class="text-center text-xs relative">
          <div>🖤🖤🖤🖤🖤🖤🖤</div>
          <div class="absolute top-0 left-0 text-center text-xs">❤❤❤❤❤</div>
        </div>
      </div>

      <div class="self-center text-4xl">V</div>

      <div class="w-35 p-2 border-2 border-light-200" @click="handleDamage">
        <AppUserIcon
          character="/monsters/15_boss_xxx.png"
          height="h-30"
          width="w-30"
          class="flip"
          :class="shake"
        />
        <p class="text-xs">❤❤❤❤❤❤❤❤❤❤❤</p>
      </div>
    </div>
  </AppPageWrapper>
</template>

<style scoped>
.flip {
  transform: scale(-1, 1);
}

.shake {
  animation: shake 0.5s;
  animation-iteration-count: infinite;
}
@keyframes shake {
  0% {
    transform: translate(1px, 1px) rotate(0deg);
  }
  10% {
    transform: translate(-1px, -2px) rotate(-1deg);
  }
  20% {
    transform: translate(-3px, 0px) rotate(1deg);
  }
  30% {
    transform: translate(3px, 2px) rotate(0deg);
  }
  40% {
    transform: translate(1px, -1px) rotate(1deg);
  }
  50% {
    transform: translate(-1px, 2px) rotate(-1deg);
  }
  60% {
    transform: translate(-3px, 1px) rotate(0deg);
  }
  70% {
    transform: translate(3px, 1px) rotate(-1deg);
  }
  80% {
    transform: translate(-1px, -1px) rotate(1deg);
  }
  90% {
    transform: translate(1px, 2px) rotate(0deg);
  }
  100% {
    transform: translate(1px, -2px) rotate(-1deg);
  }
}
</style>
