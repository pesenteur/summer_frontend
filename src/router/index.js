import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(),
    routes: [{
        path: '/',
        component: () => import('@/home/HomeBoard.vue')

    }, {
        path: '/login',
        component: () => import('@/views/account/LoginComponent.vue')
    },{
        path: '/test',
        component:()=>import('@/views/myTest/myTest.vue')
    },{
        path: '/member',
        component:()=>import('@/views/member/MemberBoard.vue')
    },{
        path: '/project',
        component:()=>import('@/views/projectManage/projectTest.vue')
    }]

});

router.beforeEach((to, from, next) => {
    next();
});
export default router
