<script setup lang="ts">
const games = ref([{ name: "TimesTables" }]);
</script>

<template>
    <AppPageWrapper class="px-4">
        <div class="pt-6">
            <div v-for="game in games" :key="game.name" class="py-4">
                <AppPixelCanvas
                    src="/items/Weapon_08.png"
                    :size="5"
                    @imgloaded="true"
                />

                <h4>
                    {{ game.name }}
                </h4>
            </div>
        </div>
    </AppPageWrapper>
</template>
