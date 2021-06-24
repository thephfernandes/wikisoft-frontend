const fs = require('fs');
const path = require('path');

module.exports = {
  // Available on server and client ($config)
  publicRuntimeConfig: {
    baseURL: process.env.BASE_URL || '/',
    loginURL: process.env.BASE_URL + '/login',
    signupURL: process.env.BASE_URL + '/signup',
    apiURL: process.env.IO_API_URL || '/api',
    searchURL: process.env.IO_API_URL + '/search',
    adminURL: process.env.IO_ADMIN_URL || '/admin',
  },

  // Only available on server ($config)
  privateRuntimeConfig: {
    googleApiKey: process.env.GOOGLE_API_KEY
  },

  ssr: true,
  // Global page headers: https://go.nuxtjs.dev/config-head
  vue: {
    config: {
      productionTip: false,
      devtools: true,
    },
  },

  head: {
    title: 'wikiprofile',
    htmlAttrs: {
      lang: 'en',
    },
    script: [
      { src: `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_API_KEY}&libraries=places`, defer: true }
    ],
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'apple-mobile-web-app-title', content: 'Wikiprofile' },
      { name: 'application-name', content: 'Wikiprofile' },
      { name: 'msapplication-TileColor', content: '#ffffff' },
      {
        name: 'msapplication-TileImage',
        content: '/favicon/mstile-144x144.png?v=rMB0bEjrjp',
      },
      {
        name: 'msapplication-config',
        content: '/favicon/browserconfig.xml?v=rMB0bEjrjp',
      },
    ],
    link: [
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/favicon/apple-touch-icon.png?v=rMB0bEjrjp',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon/favicon-32x32.png?v=rMB0bEjrjp',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '192x192',
        href: '/favicon/android-chrome-192x192.png?v=rMB0bEjrjp',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon/favicon-16x16.png?v=rMB0bEjrjp',
      },
      { rel: 'manifest', href: '/favicon/site.webmanifest?v=rMB0bEjrjp' },
      {
        rel: 'mask-icon',
        href: '/favicon/safari-pinned-tab.svg?v=rMB0bEjrjp',
        color: '#3366cc',
      },
      { rel: 'shortcut icon', href: '/favicon/favicon.ico?v=rMB0bEjrjp' },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['bulma', './assets/styles/global.scss', 'animate.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/persistedState.js' },
    { src: '~plugins/vueGoogleMaps.js' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://github.com/nuxt-community/dotenv-module
    ['@nuxtjs/dotenv', { path: './' }],
    // https://www.npmjs.com/package/@nuxtjs/fontawesome#icons
    [
      '@nuxtjs/fontawesome',
      {
        component: 'fa',
        suffix: true,
        proIcons: {
          // if you have bought the Pro packages
          // list the icons you want to add, not listed icons will be tree-shaked
          solid: ['faHome', 'faHeart'],
          // include all icons. But dont do this.
        },
      },
    ],
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://www.npmjs.com/package/@pnodev/nuxt-directus
    '@pnodev/nuxt-directus',
    // https://www.npmjs.com/package/cookie-universal-nuxt
    'cookie-universal-nuxt',
    // https://go.nuxtjs.dev/buefy
    'nuxt-buefy',
    '@nuxtjs/style-resources',
    '@nuxtjs/axios',
  ],

  axios: {
    baseURL: 'https://search.wikiprofile.com',
    proxy: false,
  },

  styleResources: {
    scss: ['~/assets/styles/global_vars.scss'],
  },

  directus: {
    apiUrl: process.env.IO_API_URL || 'https://io.wikiprofile.com',
    accessTokenCookieName: 'directus_access_token', // the name of the cookie the access_token will be saved in
    refreshTokenCookieName: 'directus_refresh_token', // the name of the cookie the refresh_token will be saved in
    loginRoute: '/login', // the route containing your login-form
    homeRoute: '/', // the route the user w ill be redirected to after authentication
    hideLoginWhenAuthenticated: true, // when set to true, authenticated users will be redirected to homeRoute, when accessing loginRoute
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extractCSS: false,
    cache: true,
    parallel: true,
  },
  modulesDir: ['../node_modules'],

  server: {
    port: process.env.FRONTEND_PORT || 3000,
    host: '0.0.0.0',
    timing: false,
  },
  // Font Awesome Pro

  router: {
    middleware: ['mobile'],
  },
};
