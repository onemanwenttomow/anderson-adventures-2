<script setup lang="ts">
import { useLevelStore } from "~/stores/level";
import { usePlayersStore } from "~/stores/players";
const { monsters } = useLevelStore();
const { playerSelected } = usePlayersStore();

const { $supabase } = useNuxtApp();
const { getDefetatedMonsters } = $supabase;
const data = await getDefetatedMonsters(playerSelected.id);
console.log("monsters: ", monsters);

const alreadyDefeated = ref(data.map((row) => row.monster_id));
</script>

<template>
  <AppPageWrapper class="px-4">
    <div v-for="(level, i) in monsters">
      <h3 class="text-2xl">Level {{ i + 1 }}</h3>
      <div class="flex flex-wrap">
        <AppUserIcon
          v-for="monster in level"
          :key="monster.id"
          :character="monster.imgUrl"
          :id="monster.id"
          height="h-30"
          width="w-30"
          :class="alreadyDefeated.includes(Number(monster.id)) ? '' : 'grayed'"
        />
      </div>
    </div>
  </AppPageWrapper>
</template>
