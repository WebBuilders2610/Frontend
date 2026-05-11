import { createRouter, createWebHistory } from 'vue-router'

// Importamos desde la ubicación correcta (presentation/)
import dashboardRoutes from './dashboard/presentation/dashboard-routes.js'
import careCoordinationRoutes from './neonatal-care-coordination/presentation/router/care-coordination.routes.js'

const router = createRouter({
    history: createWebHistory(),
    routes: [...dashboardRoutes, ...careCoordinationRoutes],
})

export default router
