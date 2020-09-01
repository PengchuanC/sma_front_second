import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


export default new Router({
    mode: 'history',
    routes:[
        {
            name: 'layout',
            path: '/',
            component: ()=>import('@/components/Layout'),
            redirect: '/home',
            meta: {
                title: 'SMA',
                keepAlive: true
            },
            children: [
                {
                    name: 'info',
                    path: '/info/:port_code',
                    component: ()=>import('@/components/home/Home'),
                    meta: {
                        title: '首页',
                        keepAlive: true
                    }
                },
                {
                    name: 'home',
                    path: '/home',
                    component: ()=>import('@/components/home/Home'),
                    meta: {
                        title: '首页',
                        keepAlive: true
                    },
                },
                {
                    name: 'message',
                    path: '/message',
                    component: ()=>import('@/components/home/MessageChild')
                },
                {
                    name: 'reports',
                    path: '/reports',
                    component: ()=>import('@/components/home/ReportsChild')
                },
                {
                    name: 'account',
                    path: '/account',
                    component: ()=>import('@/components/account/Account'),
                },
                {
                    name: 'performance',
                    path: '/performance',
                    component: ()=>import('@/components/performance/Performance')
                },
                {
                    name: 'records',
                    path: '/records',
                    component: ()=>import('@/components/history/Records')
                },
                {
                    name: 'user',
                    path: '/user',
                    component: () => import('@/components/users/Profile')
                },
                {
                    name: 'disclaimer',
                    path: 'disclaimer',
                    component: ()=>import('@/components/auth/Disclaimer')
                },
            ]
        },
        {
            name: '404',
            path: '/404',
            component: ()=>import('@/components/errors/NotFind')
        },
        {
            name: 'login',
            path: '/login',
            component: () => import('@/components/auth/Login')
        },
        {
            name: 'reset',
            path: '/reset',
            component: ()=>import('@/components/auth/Reset')
        },
        {
            path: '*',
            component: ()=>import('@/components/errors/NotFind')
        }
    ]
})
