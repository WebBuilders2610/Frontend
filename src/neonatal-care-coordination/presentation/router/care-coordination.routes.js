import CareCoordinationDashboardPage
    from '../pages/care-coordination-dashboard.page.vue';

import CarePlansPage
    from '../pages/care-plans.page.vue';

export default [

    {
        path: '/',
        redirect: '/dashboard'
    },

    {
        path: '/dashboard',
        name: 'care-coordination-dashboard',
        component: CareCoordinationDashboardPage
    },

    {
        path: '/care-plans',
        name: 'care-plans',
        component: CarePlansPage
    }
];