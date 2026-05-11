export default [
    {
        path: '/dashboard/summary/:babyId',
        name: 'health-summary',
        component: () => import('./views/health-summary-view.vue'),
    },
]
