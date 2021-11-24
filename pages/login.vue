<script setup lang="ts">
const { $supabase, $howler } = useNuxtApp();
const { handleOAuthLogin } = $supabase;
import { useOptionsStore } from '~/stores/options';
const { vibration } = useOptionsStore();
const loading = ref(false);

function signIn() {
  loading.value = true;
  $howler.ok.play();
  vibration && window.navigator.vibrate(10);
  handleOAuthLogin('google');
}
</script>

<template>
  <AppPageWrapper v-if="loading" class="flex flex-col justify-center items-center p-6">
    <AppLoading />
  </AppPageWrapper>
  <AppPageWrapper v-else class="flex flex-col justify-center md:items-center p-6">
    <h1 class="text-4xl md:text-6xl mb-8 text-white cursor-pointer">Sign In</h1>
    <div class="text-white">
      <AppBtn type="primary" full @click="signIn">Sign in with Google</AppBtn>
    </div>
  </AppPageWrapper>
</template>
