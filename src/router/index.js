import { createRouter, createWebHistory }
    from 'vue-router';

import careCoordinationRoutes
    from '../neonatal-care-coordination/presentation/router/care-coordination.routes';

const router = createRouter({
    history: createWebHistory(),

    routes: [
        ...careCoordinationRoutes
    ]
});

export default router;