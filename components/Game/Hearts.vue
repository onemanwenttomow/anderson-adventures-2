<script setup lang="ts">
const props = defineProps({
  hearts: Number,
  damaged: Boolean
});
</script>

<template>
  <TransitionGroup name="list" tag="ul" class="text-xs px-[15px] pb-[15px]">
    <li
      v-for="(heart, i) in hearts"
      :key="i"
      class="inline-block"
      :class="damaged && heart === hearts ? 'fade' : ''"
    >
      ❤
    </li>
  </TransitionGroup>
</template>

<style scoped>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.list-leave-active {
  position: absolute;
}
</style>
