<script setup lang="ts">
const { $supabase } = useNuxtApp();
const { handleAddUser, getAllUsers } = $supabase;
const router = useRouter();
const showDialog = ref(false);
const loading = ref(true);
const users = ref([] as User[]);

onMounted(() => {
  setTimeout(async () => {
    users.value = await getAllUsers();
    loading.value = false;
  }, 900);
});

function addUser({ name, iconColor, character }) {
  showDialog.value = false;
  handleAddUser(name, iconColor, character);
  users.value.push({ name, color: iconColor, character });
}

function startGame() {
  // work on the page transition
  router.push('/games');
}
</script>

<template>
  <div class="relative">
    <AppLoading v-if="loading" />
    <div v-else>
      <h1 class="text-4xl md:text-6xl text-white px-6">Whose Playing?</h1>
      <div class="flex flex-wrap p-6">
        <div v-for="user in users" :key="user.name" class="p-1 pr-4">
          <div @click="startGame">
            <div class="hover-container">
              <AppUserIcon
                :iconColor="user.color"
                :character="user.character"
                class="hover-icon transition duration-300"
              />
            </div>
            <div class="text-gray-500 text-lg text-center">
              {{ user.name }}
            </div>
          </div>
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
          <div class="text-gray-500 text-lg text-center w-20 leading-none">Add Adventurer</div>
        </div>
        <transition name="bounce">
          <UserPickerDialog v-if="showDialog" @cancel="showDialog = !showDialog" @save="addUser" />
        </transition>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hover-container:hover .hover-icon {
  transform: translateY(-2px);
}
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
