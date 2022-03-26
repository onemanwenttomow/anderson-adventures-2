import { useOptionsStore } from "~/stores/options";
import { usePlayersStore } from "~/stores/players";
import { useLevelStore } from "~/stores/level";
import { ref, Ref } from 'vue';

async function waitFor(ms) {
  return new Promise((res) => setTimeout(res, ms));
}

export function useGameLogic() {
  const { $howler, $supabase } = useNuxtApp();
  const { vibration } = useOptionsStore();
  const { defeatMonster } = $supabase;
  const levelState = useLevelStore();
  const { playerSelected } = usePlayersStore();

  const damageClasses = ref([""]);
  const enemyDamaged = ref(false);
  const playerDamaged = ref(false);
  const bossDefeated = ref(false);
  const currentTimesTable = ref(10);
  const currentMonster: Ref<Monster> = ref(levelState.currentMonster);
  const defeatedMonsters = ref([]);
  const level = ref(levelState.level);
  const enemyHearts: Ref<number> = ref(levelState.currentMonster.lives);
  const randomQuestion = ref(Math.floor(Math.random() * 8 + 2));
  const damageTime = ref(500);
  const damageTimeMs = computed(() => damageTime.value + "ms");

  function setRandomTimesTable() {
    let newRandomNumber = Math.floor(Math.random() * 8 + 2);
    while (randomQuestion.value === newRandomNumber) {
      newRandomNumber = Math.floor(Math.random() * 8 + 2);
    }
    randomQuestion.value = newRandomNumber;
    currentTimesTable.value =
      levelState.timesTables[level.value][
        Math.floor(Math.random() * levelState.timesTables[level.value].length)
      ];
  }

  function reset() {
    levelState.reset();
    level.value = 0;
    currentMonster.value = levelState.currentMonster;
    enemyHearts.value = levelState.currentMonster.lives;
    damageClasses.value = [];
    enemyDamaged.value = false;
    bossDefeated.value = false;
    currentTimesTable.value = 10;
    defeatedMonsters.value = [];
  }

  async function handleBossDefeat() {
    enemyDamaged.value = true;
    bossDefeated.value = true;
    defeatedMonsters.value = [...defeatedMonsters.value, currentMonster.value];
    defeatMonster(currentMonster.value.id, playerSelected.id);
    await monsterDefeatAnimation();
    levelState.increaseLevel();
    level.value = levelState.level;
    if (level.value === 5) {
      return;
    }
    currentTimesTable.value = levelState.currentTimesTable;
    currentMonster.value = levelState.currentMonster;
    damageClasses.value = [];
    enemyHearts.value = levelState.currentMonster.lives;
    enemyDamaged.value = false;
    bossDefeated.value = false;
  }

  async function monsterDefeatAnimation() {
    await waitFor(300);
    vibration && window.navigator.vibrate([500, 300, 500, 300, 1000]);
    damageClasses.value.push("shake wounded");
    $howler.bossDefeat.play();

    await waitFor(500);
    damageClasses.value = [];

    await waitFor(300);
    $howler.bossDefeat.play();
    damageClasses.value.push("shake wounded");

    await waitFor(500);
    damageClasses.value = [];

    await waitFor(300);
    $howler.bossDefeat.play();
    damageClasses.value.push("shake, wounded-fade");

    await waitFor(500);
  }

  function dealDamage() {
    enemyDamaged.value && enemyHearts.value--;
    playerDamaged.value && playerSelected.timesTablesHearts--;

    if (enemyDamaged.value) {
      setRandomTimesTable();
    }

    damageClasses.value = [];
    playerDamaged.value = false;
    enemyDamaged.value = false;

    if (enemyHearts.value === 0) {
      handleBossDefeat();
    }
  }

  function handleDamage(input: number) {
    $howler.hit.play();
    damageClasses.value.push("shake wounded");
    vibration && window.navigator.vibrate(damageTime.value);
    if (input == currentTimesTable.value * randomQuestion.value) {
      enemyDamaged.value = true;
    } else {
      playerDamaged.value = true;
    }
    setTimeout(dealDamage, damageTime.value);
  }

  return {
    damageClasses,
    enemyDamaged,
    playerDamaged,
    bossDefeated,
    enemyHearts,
    handleDamage,
    randomQuestion,
    damageTimeMs,
    currentTimesTable,
    currentMonster,
    level,
    defeatedMonsters,
    reset
  };
}
