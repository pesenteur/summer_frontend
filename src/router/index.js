import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(),
    routes: [{
        path: '/',
        component: () => import('@/home/HomeBoard.vue')

    }, {
        path: '/login',
        component: () => import('@/views/account/LoginComponent.vue')
    },
    {
        path: '/chatHome',
        component: () => import('@/views/home.vue')
    }]

});

router.beforeEach((to, from, next) => {
    next();
});
export default router
