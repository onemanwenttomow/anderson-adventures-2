<script setup lang="ts">
const { $supabase } = useNuxtApp();
const router = useRouter();

router.beforeEach((to, from) => {
  console.log("to, from: ", to, from);
  const session = $supabase.supabase.auth.session();
  console.log("session: ", session);
  if (to === "/" && !session) {
    console.log("redirection");
    return "/login";
  }
  // if ($supabase.supabase.auth.session()) {
  //   // router.push("/");
  // }
});
</script>

<template>
  <main class="min-h-screen bg-gray-900 flex justify-center items-center">
    <UserPicker />
  </main>
</template>
