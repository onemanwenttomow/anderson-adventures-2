<script setup lang="ts">
import { useOptionsStore } from '~/stores/options';
import { usePlayersStore } from '~/stores/players';

const { vibration } = useOptionsStore();
const { playerSelected } = usePlayersStore();
const router = useRouter();
const { $howler } = useNuxtApp();

const enemyDamaged = ref(false);
const playerDamaged = ref(false);
const enemyHearts = ref(7);
const damageClasses = ref(['']);
const input = ref(null);
const userInput = ref(null);

const turnInAction = computed(() => playerDamaged.value || enemyDamaged.value);

if (!playerSelected.name) {
  router.push('/');
}
onMounted(() => {
  if (!input.value) return;
  setTimeout(() => input.value.focus(), 10);
  setTimeout(() => $howler.music.play(), 800);
});

function damageEnemy() {
  enemyDamaged.value = true;
  setTimeout(() => {
    input.value.focus();
    enemyDamaged.value = false;
    damageClasses.value = [];
    enemyHearts.value--;
    if (enemyHearts.value === 0) {
      console.log('NEXT LEVEL');
    }
  }, 500);
}

function damagePlayer() {
  playerDamaged.value = true;
  setTimeout(() => {
    input.value.focus();
    playerDamaged.value = false;
    damageClasses.value = [];
    playerSelected.timesTablesHearts--;
    if (playerSelected.timesTablesHearts === 0) {
      console.log('GAME OVER!');
    }
  }, 500);
}

function handleDamage() {
  if (!userInput.value) return;
  $howler.hit.play();
  damageClasses.value.push('shake wounded');
  vibration && window.navigator.vibrate(500);
  if (userInput.value === 4) {
    damageEnemy();
  } else {
    damagePlayer();
  }
}
</script>

<template>
  <AppPageWrapper class="px-4" v-if="playerSelected.name">
    <div class="flex justify-between">
      <div class="max-w-[8rem] border-2 border-light-200 rounded">
        <AppUserIcon
          :character="playerSelected?.character"
          height="h-30"
          width="w-30"
          class="flip"
          :class="playerDamaged && damageClasses"
        />
        <div class="text-xs px-[15px] pb-[15px]">
          <span
            v-for="heart in playerSelected.timesTablesHearts"
            class="inline-block"
            :class="heart === enemyHearts && playerDamaged ? 'fade' : ''"
            >❤</span
          >
        </div>
      </div>

      <div class="self-center text-4xl">V</div>

      <div class="max-w-[8rem] border-2 border-light-200">
        <AppUserIcon
          character="/monsters/15_boss_xxx.png"
          height="h-30"
          width="w-30"
          class="flip"
          :class="enemyDamaged && damageClasses"
        />
        <p class="text-xs px-[15px] pb-[15px]">
          <span
            v-for="heart in enemyHearts"
            class="inline-block"
            :class="enemyDamaged && heart === enemyHearts ? 'fade' : ''"
            >❤</span
          >
        </p>
      </div>
    </div>
    <div class="flex justify-between text-5xl py-4">
      <div>2</div>
      <div>X</div>
      <div>2</div>
      <div>=</div>
      <input
        ref="input"
        v-model="userInput"
        class="text-black w-14 h-12 px-2"
        type="number"
        @keyup.enter="handleDamage"
      />
      <AppPixelCanvas
        src="/items/Weapon_08.png"
        :size="3"
        @click="handleDamage"
        :class="turnInAction ? 'opacity-20' : ''"
      />
    </div>
    <pre>turnInAction: {{ turnInAction }}</pre>
  </AppPageWrapper>
</template>

<style scoped>
.fade {
  transform: opacity;
  transition-duration: 500ms;
  opacity: 0;
}
.flip {
  transform: scale(-1, 1);
}
.wounded {
  background-color: red;
  opacity: 0.4;
  z-index: 10;
  filter: blur(2px);
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
