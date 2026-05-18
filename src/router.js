import { createRouter, createWebHistory } from 'vue-router'
import { authenticationGuard } from './iam/infrastructure/authentication.guard.js'

import iamRoutes from './iam/presentation/iam-routes.js'
import dashboardRoutes from './dashboard/presentation/dashboard-routes.js'
const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/sign-in',dashboardRoutes }, 
        ...iamRoutes,
      
    ],
})

router.beforeEach(authenticationGuard)

export default router
