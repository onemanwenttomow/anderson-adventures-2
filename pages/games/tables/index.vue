<script setup lang="ts">
import { useOptionsStore } from '~/stores/options';
import { usePlayersStore } from '~/stores/players';

const { vibration } = useOptionsStore();
const { playerSelected } = usePlayersStore();
const router = useRouter();
const { $howler } = useNuxtApp();

const enemyDamaged = ref(false);
const playerDamaged = ref(false);
const enemyHearts = ref(1);
const damageClasses = ref(['']);
const input = ref(null);
const userInput = ref(null);
const randomNumber = ref(Math.floor(Math.random() * 10 + 1));
const damageTime = ref(500);
const damageTimeMs = computed(() => damageTime.value + 'ms');
const turnInAction = computed(() => playerDamaged.value || enemyDamaged.value);

if (!playerSelected.name) {
  router.push('/');
}

onMounted(() => {
  if (!input.value) return;
  setTimeout(() => input.value.focus(), 10);
  // setTimeout(() => $howler.music.play(), 800);
});

function setRandomNumber() {
  let newRandomNumber = Math.floor(Math.random() * 10 + 1);
  while (randomNumber.value === newRandomNumber) {
    newRandomNumber = Math.floor(Math.random() * 10 + 1);
  }
  randomNumber.value = newRandomNumber;
}

function damageEnemy() {
  enemyDamaged.value = true;
  setTimeout(() => {
    enemyDamaged.value = false;
    damageClasses.value = [];
    enemyHearts.value--;
    if (enemyHearts.value === 0) {
      handleBossDefeat();
    }
    userInput.value = '';
    setRandomNumber();
  }, 500);
}

async function handleBossDefeat() {
  console.log('NEXT LEVEL');
  enemyDamaged.value = true;
  damageClasses.value.push('shake wounded');
  await waitFor(500);
  damageClasses.value = [];
  await waitFor(300);
  damageClasses.value.push('shake wounded');
  await waitFor(500);
  damageClasses.value = [];
  await waitFor(300);
  damageClasses.value.push('shake, fade');
  vibration && window.navigator.vibrate([500, 300, 500, 300, 1000]);
}

async function waitFor(ms) {
  return new Promise((res) => setTimeout(res, ms));
}

function damagePlayer() {
  playerDamaged.value = true;
  setTimeout(() => {
    playerDamaged.value = false;
    damageClasses.value = [];
    playerSelected.timesTablesHearts--;
    if (playerSelected.timesTablesHearts === 0) {
      console.log('GAME OVER!');
    }
  }, 500);
}

function handleDamage() {
  if (!userInput.value || turnInAction.value) {
    return input.value.focus();
  }
  $howler.hit.play();
  damageClasses.value.push('shake wounded');
  vibration && window.navigator.vibrate(damageTime.value);
  input.value.focus();
  if (userInput.value === 10 * randomNumber.value) {
    damageEnemy();
  } else {
    damagePlayer();
  }
}
</script>

<template>
  <AppPageWrapper class="px-4" v-if="playerSelected.name">
    <div class="flex justify-between pt-6">
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

    <div class="flex justify-between text-5xl py-10 px-[15px]">
      <div>10</div>
      <div>&middot;</div>
      <div>{{ randomNumber }}</div>
      <div>=</div>
      <input
        ref="input"
        v-model="userInput"
        class="text-black w-14 h-12 px-2 text-xl"
        type="number"
        @keyup.enter="handleDamage"
      />
      <AppPixelCanvas src="/items/Weapon_08.png" :size="3" @click="handleDamage" />
    </div>
  </AppPageWrapper>
</template>

<style scoped>
.fade {
  transform: opacity;
  transition-duration: v-bind(damageTimeMs);
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
  animation: shake v-bind(damageTimeMs);
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
