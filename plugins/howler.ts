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

  const music = new Howl({
    src: ['/sounds/01_LOOP_UPWARDS.wav'],
    loop: true,
    volume: 0.2,
  });

  nuxtApp.provide('howler', { ok, cancel, hit, music });
});
