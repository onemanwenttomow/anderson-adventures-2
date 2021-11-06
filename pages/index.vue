<script setup lang="ts">
console.log("hello");
const test = useNuxtApp();
console.log("test: ", test);
console.log("nuxtApp.ssrContext: ", test.ssrContext);
</script>

<template>
  <main class="min-h-screen bg-gray-900 flex justify-center items-center">
    <UserPicker />
  </main>
</template>
