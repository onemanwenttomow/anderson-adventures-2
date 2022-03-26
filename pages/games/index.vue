<script setup lang="ts">
const { $howler } = useNuxtApp();
const router = useRouter();
const games = ref([
  { name: "TimesTables", slug: "tables", icon: "/items/Misc_52.png" },
  { name: "Defeated Monsters", slug: "defeated", icon: "/items/Misc_12.png" }
]);
function handleClick(slug) {
  $howler.ok.play();
  router.push(`/games/${slug}`);
}
</script>

<template>
  <AppPageWrapper class="px-4">
    <div class="flex justify-center items-center pt-6 gap-8">
      <div
        v-for="game in games"
        :key="game.name"
        class="py-4 cursor-pointer"
        @click="handleClick(game.slug)"
      >
        <AppPixelCanvas :src="game.icon" :size="5" @imgloaded="true" />
      </div>
    </div>
  </AppPageWrapper>
</template>
