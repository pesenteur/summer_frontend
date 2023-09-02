import { createRouter, createWebHistory } from 'vue-router'
import useCustomLoading from "@/utils/loading";
import {nextTick} from "vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [{
        path: '/',
        component: () => import('@/views/home/home.vue'),
        meta: {
            no_login: true
        }
    }, {
        path: '/login',
        component: () => import('@/views/account/LoginComponent.vue'),
        meta: {
            'hiddenHeader': true
        }
    }, {
        path: '/buttonGroup',
        component: () => import('@/views/editor/buttonGroup.vue')
    }, {
        path: '/test',
        component: () => import('@/views/myTest/myTest.vue')
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
        component: () => import('@/views/dragger/originDesign.vue')
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
        path: '/document/:documentId',
        component: () => import('@/views/editor/editor.vue')
    }, {
        path: '/home',
        component: () => import('@/home/HomeBoard.vue'),
    }, {
        path: '/preview',
        component: () => import('@/views/dragger/preview.vue')
    }, {
        path: '/shared/:sharedId',
        component: () => import('@/views/editor/share.vue'),
        meta: {
            no_login: true
        }
    }, {
        path: '/restore/',
        component: () => import('@/views/editor/restore.vue')
    },
    {
        path: '/origin/template/:tempName',
        component: () => import('@/views/dragger/originTemplate.vue')

    }]

});

router.beforeEach((to, from) => {
    useCustomLoading().start({
        fullscreen: true,
        text: '加载中，请稍后'
    });
    const token = localStorage.getItem('TOKEN');
    if (!to.meta.no_login && !token && to.path !== '/login') {
        // 如果没有登录且访问的不是 /login 路由或设置了 no_login 标记的路由，重定向到 /login
        return '/login';
    } else if (token && to.path === '/login' && from.path === '/') {
        return '/home'
    }
    else if (token && to.path === '/login') {
        // 如果已登录但访问的是 /login 路由，重定向到上一个页面
        return false;
    }
});

router.afterEach(to=> {
    nextTick(useCustomLoading().end).then(() => {});
});

export default router
