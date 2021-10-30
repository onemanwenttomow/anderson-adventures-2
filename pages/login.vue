<script setup>
const { $supabase } = useNuxtApp();
const { handleOAuthLogin } = $supabase;
</script>

<template>
  <div class="min-h-screen bg-gray-900 flex justify-center items-center">
    <h1 class="text-6xl text-white p-6 cursor-pointer" @click="handleOAuthLogin('google')">
      Login
    </h1>
  </div>
</template>
