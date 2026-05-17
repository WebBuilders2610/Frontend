import { createRouter, createWebHistory } from 'vue-router'
import { authenticationGuard } from './iam/infrastructure/authentication.guard.js'

import iamRoutes from './iam/presentation/iam-routes.js'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/sign-in' }, 
        ...iamRoutes,
      
    ],
})

router.beforeEach(authenticationGuard)

export default router
