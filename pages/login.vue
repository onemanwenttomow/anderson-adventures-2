<script setup lang="ts">
import { useOptionsStore } from "~/stores/options";
const { $supabase, $howler } = useNuxtApp();
const { handleOAuthLogin } = $supabase;
const { vibration } = useOptionsStore();
const loading = ref(false);

function signIn() {
  loading.value = true;
  $howler.ok.play();
  vibration && window.navigator.vibrate(10);
  handleOAuthLogin("google");
}
</script>

<template>
  <AppPageWrapper v-if="loading" class="p-6">
    <AppLoading />
  </AppPageWrapper>
  <AppPageWrapper v-else class="p-6 pt-30">
    <h1 class="text-4xl md:text-6xl mb-4 text-white cursor-pointer">Sign In</h1>
    <input
      class="w-full bg-gray-400 h-8 text-white placeholder-current px-2 my-2 flex-grow"
      placeholder="Name"
      type="text"
    />
    <input
      class="w-full bg-gray-400 h-8 text-white placeholder-current px-2 my-2 flex-grow"
      placeholder="Password"
      type="password"
    />
    <div class="text-white mt-4">
      <AppBtn type="primary" full @click="signIn">Sign in</AppBtn>
    </div>
    <h2 class="text-4xl md:text-6xl mt-12 mb-4 text-white cursor-pointer">
      Sign In With 3rd Party
    </h2>
    <div class="text-white">
      <AppBtn type="primary" full @click="signIn">Sign in with Google</AppBtn>
    </div>
  </AppPageWrapper>
</template>
