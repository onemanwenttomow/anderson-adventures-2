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
