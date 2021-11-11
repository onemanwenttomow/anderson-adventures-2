<script setup lang="ts">
// You can control whether disabled variants are enabled for a plugin in the variants section of your tailwind.config.js file:
const props = defineProps({
  type: String,
  disabled: Boolean,
  full: Boolean
});

const base = [
  "mr-4 py-1 px-6 tracking-widest border-2 disabled:bg-white disabled:border-white disabled:text-gray-500 "
];
const btnClasses = {
  primary: ["bg-green-600 border-green-600"],
  secondary: ["bg-transparent text-gray-500 border-gray-500 hover:text-white hover:border-white"]
};

console.log('type: ',props);
</script>

<template>
  <button :disabled="disabled" @click="$emit('clicked')" :class="[base, btnClasses[type]]" class="">
    <slot></slot>
  </button>
</template>
