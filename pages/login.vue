<script setup>
const { $supabase } = useNuxtApp();
const router = useRouter();
const { handleOAuthLogin } = $supabase;

router.beforeEach((to, from) => {
  console.log("to, from: ", to, from);
  const session = $supabase.supabase.auth.session();
  console.log("session: ", session);
  if (to === "/login" && session) {
    console.log("redirection");
    return "/";
  }
  // if ($supabase.supabase.auth.session()) {
  //   // router.push("/");
});
</script>

<template>
  <div class="min-h-screen bg-gray-900 flex justify-center items-center">
    <h1 class="text-6xl text-white p-6 cursor-pointer" @click="handleOAuthLogin('google')">
      Login
    </h1>
  </div>
</template>
