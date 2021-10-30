<script setup lang="ts">
const { $supabase } = useNuxtApp();
const { supabase, handleLogout, handleAddUser, getAllUsers } = $supabase;
const session = supabase.auth.session();
const showDialog = ref(false);
const users = ref([] as User[]);
const response = await getAllUsers(session);
users.value = response;

function addUser(name) {
  showDialog.value = false;
  handleAddUser(name, session);
  users.value.push({ name });
}
</script>

<template>
  <div class="relative">
    <h1 class="text-6xl text-white p-6" @click="handleLogout">Whose Playing?</h1>
    <div class="flex justify-center">
      <div v-for="user in users" :key="user.name">
        <AppUserIcon />
        <div class="text-gray-500 text-lg text-center">{{ user.name }}</div>
      </div>
      <div @click="showDialog = true">
        <div
          class="
            h-20
            w-20
            m-1
            rounded
            hover:bg-white
            text-gray-500
            flex
            justify-center
            items-center
            text-6xl
            font-bold
            cursor-pointer
          "
        >
          <div class="-mt-4">+</div>
        </div>
        <div class="text-gray-500 text-lg text-center">Add Player</div>
      </div>
      <transition name="bounce">
        <UserPickerDialog v-if="showDialog" @cancel="showDialog = !showDialog" @save="addUser" />
      </transition>
    </div>
  </div>
</template>

<style scoped>
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
</style>
