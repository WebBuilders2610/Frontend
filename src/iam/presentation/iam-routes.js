export default [
    {
        path: '/sign-in',
        name: 'sign-in',
        component: () => import('./views/sign-in-form.vue'),
        meta: { requiresAuth: false },
    },
]
