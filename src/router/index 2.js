import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
    history: createWebHistory(),
    routes: [{
        path: '/',
        component: () => import('@/home/HomeProject.vue')

    }]

});

router.beforeEach((to, from, next) => {
    next();
});
export default router
