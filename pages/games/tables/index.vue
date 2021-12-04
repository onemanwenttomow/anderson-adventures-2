<script setup lang="ts">
import { usePlayersStore } from '~/stores/players';
const { playerSelected } = usePlayersStore();
</script>

<template>
  <AppPageWrapper class="px-4">
    <div class="flex justify-between">
      <div>
        <AppUserIcon :character="playerSelected.character" height="h-30" width="w-30" />
      </div>

      <div class="self-center text-4xl">V</div>

      <div class="shake">
        <AppUserIcon character="/monsters/15_boss_xxx.png" height="h-30" width="w-30" />
      </div>
    </div>
  </AppPageWrapper>
</template>

<style scoped>
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
