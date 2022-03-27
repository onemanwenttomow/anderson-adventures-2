<script setup lang="ts">
import gsap from 'gsap'

const props = defineProps<{
  monsters: Monster[]
}>()

function onBeforeEnter(el) {

  console.log('el: ',el);
    el.style.opacity = 0
    el.style.height = 0
}
function onEnter(el, done) {
  console.log('el, done: ',el, done);
    gsap.to(el, {
        opacity: 1,
        height: '1.6em',
        delay: el.dataset.index * 0.15,
        onComplete: done
      })
}
function onLeave(el, done) {
  console.log('el, done: ',el, done);
    gsap.to(el, {
        opacity: 0,
        height: 0,
        delay: el.dataset.index * 0.15,
        onComplete: done
      })
}
</script>

<template>
  <TransitionGroup
    tag="div"
    :css="false"
    class="flex flex-wrap"
    @before-enter="onBeforeEnter"
    @enter="onEnter"
    @leave="onLeave"
  >
    <AppUserIcon
        v-for="monster in monsters"
        :key="monster.id"
        :character="monster.imgUrl"
        height="h-30"
        width="w-30"
        class="flip grayed"
    />
    </TransitionGroup>
</template>

<style scoped>
</style>
