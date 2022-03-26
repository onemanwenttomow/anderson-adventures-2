<script setup lang="ts">
useMeta({
  meta: [
    {
      name: "theme-color",
      content: "#111827"
    }
  ]
});
</script>

<template>
  <div class="h-full background">
    <AppHeader />
    <slot />
  </div>
</template>

<style>
.grayed {
  filter: grayscale(1);
}
</style>
