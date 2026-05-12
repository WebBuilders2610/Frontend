import { createRouter, createWebHistory } from 'vue-router';

import careCoordinationRoutes from '../neonatal-care-coordination/presentation/router/care-coordination.routes';

import healthProfilesRoutes from '../neonatal-health-profiles/presentation/health-profiles.routes.js';

const router = createRouter({
    history: createWebHistory(),

    routes: [
        { path: '/', redirect: 'dashboard' },

        ...careCoordinationRoutes,
        ...healthProfilesRoutes
    ]
});

/**
 * Guard para actualizar el título de la página según la meta información de la ruta.
 */
router.beforeEach((to, from, next) => {
    document.title = to.meta.title ? `${to.meta.title} | SIRAN` : 'SIRAN';
    next();
});

export default router;