<template>
  <div>
      <ul class="grid grid-cols-3 gap-3">
        <li v-for="i in 9" class="num-pad-li" @click="$emit('num', i.toString())">{{ i }}</li>
        <li class="num-pad-li" @click="$emit('num', 'del')">❎</li>
        <li class="num-pad-li" @click="$emit('num', '0')">0</li>
        <li class="num-pad-li" @click="$emit('num', 'enter')">⚔️</li>
      </ul>
    </div>
</template>
