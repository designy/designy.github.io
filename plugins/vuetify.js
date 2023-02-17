import { createVuetify } from 'vuetify'
import { VLayout, VAppBar, VNavigationDrawer, VBtn, VMain, VIcon, VAppBarNavIcon, VAppBarTitle } from 'vuetify/components'
import colors from 'vuetify/lib/util/colors'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

const vuetify = createVuetify({
    ssr: true,
    components: {
        VLayout,
        VAppBar,
        VNavigationDrawer,
        VBtn,
        VMain,
        VIcon,
        VAppBarNavIcon,
        VAppBarTitle
    },
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
            mdi,
        }
    },
    theme: {
        themes: {
            light: {
                dark: false,
                colors: {
                    primary: colors.teal.darken2, // #E53935
                    secondary: colors.red.lighten4, // #FFCDD2
                }
            },
        },
    },
})

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(vuetify)
})