export default [
    {
        path: '/agregar-bebe',
        name: 'add-neonate',
        component: () => import('./views/add-neonate-form.vue'),
        meta: {
            requiresAuth: true, // Protegemos la ruta para que solo entren usuarios logueados
        },
    },
]
