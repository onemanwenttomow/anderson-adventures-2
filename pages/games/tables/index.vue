<script setup lang="ts">
import { usePlayersStore } from '~/stores/players';

const { playerSelected } = usePlayersStore();
const { damageClasses,
  enemyDamaged,
  playerDamaged,
  bossDefeated,
  enemyHearts,
  handleDamage,
  randomQuestion,
  damageTimeMs,
  currentTimesTable 
} = useGameLogic();

const router = useRouter();
if (!playerSelected.name) {
  router.push('/');
}


const userInput = ref(null);
const gameOver = computed(() => playerSelected.timesTablesHearts === 0);
const turnInAction = computed(() => playerDamaged.value || enemyDamaged.value);


onMounted(() => {
  playerSelected.timesTablesHearts = 5;
  // setTimeout(() => $howler.music.play(), 800);
});

console.log('currentTimesTable: ',currentTimesTable);

function handleNumPad(entry) {
  if (entry === 'del') {
    return userInput.value = ''
  }

  if (entry === 'enter') {
    handleDamage(userInput.value)
    if (enemyDamaged.value) {
      userInput.value = ''
    }
    return
  }

  const oldValue = userInput.value ? userInput.value : '';
  userInput.value = oldValue + entry;
}

</script>

<template>
  <AppPageWrapper class="px-4" v-if="playerSelected.name">
    <div class="flex justify-between pt-6">
      <div class="max-w-[8rem] border-2 border-light-200 rounded">
        <AppUserIcon
          :character="playerSelected.character"
          height="h-30"
          width="w-30"
          class="flip"
          :class="playerDamaged && damageClasses"
        />
        <div class="text-xs px-[15px] pb-[15px]">
          <span
            v-for="(heart, i) in playerSelected.timesTablesHearts"
            :key="i"
            class="inline-block"
            :class="playerDamaged && heart === playerSelected.timesTablesHearts ? 'fade' : ''"
          >❤</span>
        </div>
      </div>

      <div class="self-center text-4xl">V</div>

      <div v-if="!bossDefeated" class="max-w-[8rem] border-2 border-light-200">
        <AppUserIcon
          character="/monsters/15_boss_xxx.png"
          height="h-30"
          width="w-30"
          class="flip"
          :class="enemyDamaged && damageClasses"
        />
        <p class="text-xs px-[15px] pb-[15px]">
          <span
            v-for="(heart, i) in enemyHearts"
            :key="i"
            class="inline-block"
            :class="enemyDamaged && heart === enemyHearts ? 'fade' : ''"
          >❤</span>
        </p>
      </div>
      <div
        v-else
        class="flex justify-center items-center max-w-[8rem] border-2 border-light-200 w-30 text-7xl"
      >☠</div>
    </div>

    <div v-if="!gameOver" class="flex justify-between text-5xl py-10 px-[15px]">
      <div>{{ currentTimesTable }}</div>
      <div>&middot;</div>
      <div>{{ randomQuestion }}</div>
      <div>=</div>
      <input
        v-model="userInput"
        class="text-black w-14 h-12 px-2 text-xl"
        type="number"
        @keyup.enter="() => handleDamage(userInput)"
      />
      <AppPixelCanvas src="/items/Weapon_08.png" :size="3" @click="() => handleDamage(userInput)" />
    </div>

    <div v-else class="flex flex-col justify-center items-center py-10">
      <p class="text-center text-5xl">Game Over!</p>
      <nuxt-link to="/games">
        <AppBtn type="primary" class="m-4 mt-10">Play Again?</AppBtn>
      </nuxt-link>
    </div>

    <AppNumPad v-if="!gameOver" @num="handleNumPad" />
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
