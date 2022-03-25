<script setup lang="ts">
import { useLevelStore } from "~/stores/level";
import { usePlayersStore } from "~/stores/players";
const { monsters } = useLevelStore();
const { playerSelected } = usePlayersStore();

const { $supabase } = useNuxtApp();
const { getDefetatedMonsters } = $supabase;
const data = await getDefetatedMonsters(playerSelected.id);

const alreadyDefeated = ref(data.map((row) => row.monster_id));

const flatMonsters = monsters.flat();
</script>

<template>
  <AppPageWrapper class="px-4">
    <div class="flex flex-wrap justify-center">
      <AppUserIcon
        v-for="monster in flatMonsters"
        :key="monster.id"
        :character="monster.imgUrl"
        :id="monster.id"
        height="h-30"
        width="w-30"
        :class="alreadyDefeated.includes(Number(monster.id)) ? '' : 'grayed'"
      />
    </div>
  </AppPageWrapper>
</template>
