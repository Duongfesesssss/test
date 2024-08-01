// nuxt.config.ts
import Lara from '@primevue/themes/lara';

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  components: true,
  
  
  modules: ['@primevue/nuxt-module', "@nuxtjs/leaflet"],
primevue: {
  options: {
    
      ripple: true,
      inputVariant: 'filled',
      theme: {
          preset: Lara,
          options: {
              prefix: 'p',
              darkModeSelector: 'system',
              cssLayer: false
          }
      }
  }
},

  
  
  css: [
    'bootstrap/dist/css/bootstrap.min.css',
    'primeicons/primeicons.css'
  ],
  build: {
    transpile: ['primevue'],
  },
  vite: {
    define: {
      'process.env.DEBUG': false,
    },
  },
  plugins: [
    { src: '~/plugins/bootstrap.client.ts', mode: 'client' }

  ],
 
});