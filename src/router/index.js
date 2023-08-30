import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(),
    routes: [{
        path: '/',
        component: () => import('@/home/HomeBoard.vue')

    }, {
        path: '/login',
        component: () => import('@/views/account/LoginComponent.vue')
    }, {
        path: '/buttonGroup',
        component: () => import('@/views/editor/buttonGroup.vue')
    }, {
        path: '/test',
        component: () => import('@/views/dragger/originDesign.vue')
    }, {
        path: '/member',
        component: () => import('@/views/member/MemberBoard.vue')
    }, {
        path: '/project',
        component: () => import('@/views/projectManage/projectManage.vue')
    }, {
        path: '/workSpace',
        component: () => import('@/views/myProject/myProject.vue')
    }, {
        path: '/team/:team_id/chatHome',
        component: () => import('@/views/chatHome/chatHome.vue')
    }, {
        path: '/drag',
        component: () => import('@/views/dragger/designDragger.vue')
    }, {
        path: '/design',
        component: ()=> import('@/views/dragger/originDesign.vue')
    }, {
        path: '/chatHome',
        component: () => import('@/views/chatHome/chatHome.vue')
    }, {
        path: '/switch',
        component: () => import('@/views/switch/SwitchBoard.vue'),
        meta: {
            'hiddenHeader': true
        }
    }, {
        path: '/document',
        component: () => import('@/views/editor/editor.vue')
    },{
        path: '/home',
        component: ()=> import('@/views/home/home.vue')
    }]

});

router.beforeEach((to, from, next) => {
    next();
});
export default router
