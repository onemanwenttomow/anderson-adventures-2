<script setup lang="ts">
const { $supabase } = useNuxtApp();
const { handleLogout, handleAddUser, getAllUsers } = $supabase;
const showDialog = ref(false);
const loading = ref(true);
const users = ref([] as User[]);

onMounted(() => {
  // need to add a delay otherwise session is null
  // maybe check the route and see if it has been redirected from supabase..
  setTimeout(async () => {
    const response = await getAllUsers();
    users.value = response;
    loading.value = false;
  }, 900);
});

function addUser({ name, iconColor, character }) {
  showDialog.value = false;
  handleAddUser(name, iconColor, character);
  users.value.push({ name, color: iconColor, character });
}
</script>

<template>
  <div class="relative">
    <AppLoading v-if="loading" />
    <div v-else>
      <h1 class="text-4xl md:text-6xl text-white px-6" @click="handleLogout">Whose Playing?</h1>
      <div class="flex flex-wrap p-6">
        <div v-for="user in users" :key="user.name" class="p-1 pr-4">
          <AppUserIcon :iconColor="user.color" :character="user.character" />
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
