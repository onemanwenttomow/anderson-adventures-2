<script setup>
const count = ref(0);
function increment() {
  count.value++;
}
</script>

<template>
  <AppPageWrapper class="flex justify-center items-center">
    <UserPicker />
    <!-- <transition name="slide-fade" mode="out-in">
      <div class="px-4" :key="count">{{ count }}</div>
    </transition>
    <button @click="increment">+</button>-->
  </AppPageWrapper>
</template>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from {
  transform: translateY(-20px);
  opacity: 0;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>
