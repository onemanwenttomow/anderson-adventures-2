import { defineNuxtConfig } from 'nuxt3';

export default defineNuxtConfig({
  buildModules: ['@nuxtjs/eslint-module', 'nuxt-windicss', ['@pinia/nuxt', { disableVuex: true }]],
  //'@pinia/nuxt'
  publicRuntimeConfig: {
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseKey: process.env.SUPABASE_KEY,
  },
  meta: {
    link: [{ rel: 'stylesheet', href: '/css/transitions.css' }],
  },
});
