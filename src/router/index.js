import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


export default new Router({
    mode: 'history',
    routes:[
        {
            name: 'layout',
            path: '/',
            component: ()=>import('../components/Layout'),
            redirect: '/home',
            meta: {
                title: 'SMA',
                keepAlive: true
            },
            children: [
                {
                    name: 'home',
                    path: '/home',
                    component: ()=>import('../components/home/Home'),
                    meta: {
                        title: '首页'
                    }
                },
                {
                    name: 'account',
                    path: '/account',
                    component: ()=>import('../components/account/Account')
                },
                {
                    name: 'performance',
                    path: '/performance',
                    component: ()=>import('../components/performance/Performance')
                },
                {
                    name: 'user',
                    path: '/user',
                    component: () => import('../components/users/Profile')
                }
            ]
        },
        {
            name: '404',
            path: '/404',
            component: ()=>import('../components/errors/NotFind')
        }
    ]
})
