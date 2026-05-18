export default [
    {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('./views/dashboard-view.vue'),
        meta: {
            requiresAuth: true, 
        },
    },
]
