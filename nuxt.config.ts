import { defineNuxtConfig } from 'nuxt';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  meta: [{ name: 'description', content: 'My Appwrite site.' }],
  modules: ['@nuxtjs/tailwindcss', '@tailvue/nuxt'],
});
