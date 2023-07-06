// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    ssr: true,
    app:{
    head: {
        title: 'ali esmaeili',
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
    },
    css: [
        '@/assets/css/main.css',
        'vuetify/lib/styles/main.sass',
        '@mdi/font/css/materialdesignicons.min.css',
        'animate.css/animate.min.css',
    ],
    build: {
        transpile: ['vuetify'],
    },
    modules: [
        '@nuxtjs/i18n',
    ],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    i18n: {
        locales: [
            {
                code: 'fa',
                name: 'فارسی',
                dir: 'rtl',
            },
            {
                code: 'en',
                name: 'انگلیسی',
                dir: 'ltr',
            },

        ],
        defaultLocale: 'fa',
        defaultDirection: 'rtl',
        vueI18nLoader: true,
        vueI18n: {
            fallbackLocale: 'fa',
            messages: {
                en: {},
                fa: {
                    "About": "درباره من",
                    "Resume": "رزومه من",
                    "Works": "کارهای من",
                    "Contact": "ارتباط با من",
                    "Blog": "وبلاگ من"
                },
            },
        },
    },
})
