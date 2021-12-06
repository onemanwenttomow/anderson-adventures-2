import { Howl, Howler } from 'howler';
import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin(async (nuxtApp) => {
  const ok = new Howl({
    src: ['/sounds/ok-1.wav'],
  });

  const cancel = new Howl({
    src: ['/sounds/cancel-3.wav'],
  });

  const hit = new Howl({
    src: ['/sounds/hit-4.wav'],
  });

  nuxtApp.provide('howler', { ok, cancel, hit });
});
