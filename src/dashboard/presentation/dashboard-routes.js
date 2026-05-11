export default [
    {
        path: '/dashboard',
        name: 'dashboard-main',
        component: () => import('./views/dashboard-view.vue'), // Asegúrate de que el nombre del archivo coincida
    },
    {
        path: '/dashboard/summary/:babyId',
        name: 'health-summary',
        component: () => import('./views/health-summary-view.vue'),
    },
]
