<script setup lang="ts">
import AppBtn from '~/components/AppBtn.vue';
const { $supabase } = useNuxtApp();
const { handleOAuthLogin } = $supabase;
import { useStore } from '~/stores/options';
import AppPageWrapper from '~/components/AppPageWrapper.vue';
const { vibration } = useStore();
const loading = ref(false);

function signIn() {
  loading.value = true;
  vibration && window.navigator.vibrate(50);
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
