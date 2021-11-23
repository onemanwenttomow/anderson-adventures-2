<script setup lang="ts">
const { iconColor, newColor } = useIconColor();
const { character, newCharacter } = usePlayerCharacter();
const { $howler } = useNuxtApp();

const userName = ref('');
const emit = defineEmits(['save', 'cancel']);

// TODO char limit on name of player...

function handleContinue() {
  if (userName.value) {
    $howler.ok.play();
    emit('save', { name: userName.value, iconColor, character });
  }
}

function cancel() {
  $howler.cancel.play();
  emit('cancel');
}
</script>

<template>
  <div
    class="absolute inset-0 bg-gray-900 text-white flex flex-col justify-center items-center p-4"
  >
    <div>
      <h1 class="text-4xl md:text-6xl py-6">Add Adventurer</h1>
      <h2 class="text-gray-500 text-lg pb-6 border-b-2 mb-4 border-gray-500">
        Create your profile to play Anderson Adventures.
      </h2>
      <div class="flex justify-between items-center border-b-2 pb-4 border-gray-500">
        <AppUserIcon
          :iconColor="iconColor"
          :newColor="newColor"
          :character="character"
          :newCharacter="newCharacter"
        />
        <input
          class="bg-gray-400 h-8 text-white placeholder-current px-2 ml-4 flex-grow"
          placeholder="Name"
          type="text"
          v-model="userName"
        />
      </div>
      <div class="mt-4">
        <AppBtn type="primary" :disabled="!userName" @clicked="handleContinue" class="mr-4">
          Continue
        </AppBtn>
        <AppBtn type="secondary" @clicked="cancel">Cancel</AppBtn>
      </div>
    </div>
  </div>
</template>
