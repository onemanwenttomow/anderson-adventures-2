<script setup lang="ts">
import { usePlayersStore } from "~/stores/players";
const { playerSelected } = usePlayersStore();
</script>

<template>
    <AppPageWrapper class="px-4">
        <h1>Hello</h1>
        <div class="flex justify-between">
            <div>
                <AppUserIcon
                    :character="playerSelected.character"
                    height="h-30"
                    width="w-30"
                />
            </div>

            <div class="self-center">V</div>

            <div>
                <AppUserIcon
                    character="/player/29_minion_01_xxx.png"
                    height="h-30"
                    width="w-30"
                />
            </div>
        </div>
    </AppPageWrapper>
</template>
