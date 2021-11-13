<script setup lang="ts">
import AppBtn from "~/components/AppBtn.vue";
const { $supabase } = useNuxtApp();
const { handleOAuthLogin } = $supabase;
</script>

<template>
  <div class="h-full bg-gray-900 flex flex-col justify-center md:items-center p-6">
    <h1 class="text-4xl md:text-6xl mb-8 text-white cursor-pointer">Sign In</h1>
    <div class="text-white">
      <AppBtn type="primary" full @click="handleOAuthLogin('google')">Sign in with Google</AppBtn>
    </div>
  </div>
</template>
