<script setup lang="ts">
const { $howler } = useNuxtApp();
const router = useRouter();
const games = ref([
  { name: "TimesTables", slug: "tables" },
  { name: "Defeated Monsters", slug: "defeated" }
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
        <AppPixelCanvas src="/items/Misc_52.png" :size="5" @imgloaded="true" />

        <h4>
          {{ game.name }}
        </h4>
      </div>
    </div>
  </AppPageWrapper>
</template>
