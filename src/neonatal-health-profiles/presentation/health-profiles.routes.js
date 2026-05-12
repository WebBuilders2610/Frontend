// Lazy-loaded components con los nuevos nombres de archivo
const BabyManagement = () => import('./views/baby-management-view.vue');
const Settings = () => import('./views/settings-view.vue');

/**
 * Route definitions for the Neonatal Health Profiles bounded context.
 * * @type {import('vue-router').RouteRecordRaw[]}
 */
const healthProfilesRoutes = [
    {
        path: '/dashboard',
        name: 'neonatal-dashboard',
        component: BabyManagement,
        meta: { title: 'Dashboard - Agregar Bebé' }
    },
    {
        path: '/baby/:id/edit',
        name: 'neonatal-baby-edit',
        component: BabyManagement,
        meta: { title: 'Editar Perfil Neonatal' }
    },
    {
        path: '/settings',
        name: 'neonatal-settings',
        component: Settings,
        meta: { title: 'Configuración de Perfil' }
    }
];

export default healthProfilesRoutes;