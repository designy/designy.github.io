export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'aliii',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'وب‌سایت شخصی علی اسماعیلی | جایی برای به اشتراک‌گذاری تجربه‌ها و یادگیری فرانت‌اند',
      },
    ],

    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: '/styles/font.css',
      },
      {
        rel: 'preload',
        href: '/fonts/woff2/IRANSansWeb.woff2',
        as: 'font',
        crossorigin: 'anonymous',
      },
      {
        rel: 'preload',
        href: '/fonts/woff2/IRANSansWeb_Bold.woff2',
        as: 'font',
        crossorigin: 'anonymous',
      },
      {
        rel: 'preload',
        href: '/fonts/fontawesome/webfonts/fa-solid-900.woff2',
        as: 'font',
        crossorigin: 'anonymous',
      },
      {
        rel: 'preload',
        href: '/fonts/fontawesome/webfonts/fa-regular-400.woff2',
        as: 'font',
        crossorigin: 'anonymous',
      },
      {
        rel: 'preload',
        href: '/fonts/fontawesome/webfonts/fa-brands-400.woff2',
        as: 'font',
        crossorigin: 'anonymous',
      },
      {
        rel: 'stylesheet',
        href: '/fonts/fontawesome/css/all.min.css',
      },
    ],
  },
  srcDir: 'src',
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    {
      lang: 'css',
      src: 'animate.css/animate.min.css',
    },
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/i18n.js', '~/plugins/vue-screen.js'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    '@nuxtjs/tailwindcss',
  ],
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    'nuxt-i18n',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},
  i18n: {
    locales: [
      {
        code: 'en',
        name: 'انگلیسی',
        dir: 'ltr',
      },
      {
        code: 'fa',
        name: 'فارسی',
        dir: 'rtl',
      },
    ],
    defaultLocale: 'fa',
    defaultDirection: 'rtl',
    vueI18nLoader: true,
    vueI18n: {
      fallbackLocale: 'en',
      messages: {
        en: {},
        fa: {},
      },
    },
  },
  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    meta: {
      name: 'aliii',
      description: 'وب‌سایت شخصی علی اسماعیلی',
      lang: 'fa',
      theme_color: '#34D399',
    },
    manifest: {
      name: 'aliii.ir',
      short_name: 'aliii',
      description: 'وب‌سایت شخصی علی اسماعیلی',
      dir: 'rtl',
      display: 'standalone',
      lang: 'fa',
      // gcm_sender_id: '103953800507',
      background_color: '#fff',
      theme_color: '#34D399',
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  tailwindcss: {
    configPath: 'tailwind.config.js',
    // jit: true,
    viewer: false,
  },
};
