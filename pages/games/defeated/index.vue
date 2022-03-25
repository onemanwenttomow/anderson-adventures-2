<script setup lang="ts">
import { useLevelStore } from "~/stores/level";
const { monsters } = useLevelStore();
const flatMonsters = monsters.flat();
</script>

<template>
  <AppPageWrapper class="px-4">
    <div>Hello</div>
    <div class="flex flex-wrap justify-center">
      <AppUserIcon
        v-for="monster in flatMonsters"
        :key="monster.id"
        :character="monster.imgUrl"
        height="h-30"
        width="w-30"
        class="flip grayed"
      />
    </div>
  </AppPageWrapper>
</template>
