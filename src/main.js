import { createApp } from 'vue'
import App from './app.vue'

import router from './router.js'
import { createPinia } from 'pinia'
import i18n from './i18n.js' 

import PrimeVue from 'primevue/config'
import Material from '@primeuix/themes/material'
import ConfirmationService from 'primevue/confirmationservice'
import DialogService from 'primevue/dialogservice'
import ToastService from 'primevue/toastservice'
import Tooltip from 'primevue/tooltip'

import './iam/infrastructure/iam.interceptor.js'

import 'primeflex/primeflex.css'
import 'primeicons/primeicons.css'
import './style.css'

const app = createApp(App)

app.use(createPinia())
    .use(router)
    .use(i18n)
    app.use(PrimeVue, {
        theme: {
            preset: Material,
            options: {
                darkModeSelector: 'none',
            },
        },
        ripple: true,
    })
        .use(ConfirmationService)
        .use(DialogService)
        .use(ToastService)
        .directive('tooltip', Tooltip) 

app.mount('#app')
