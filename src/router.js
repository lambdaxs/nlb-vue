/**
 * Created by xiaos on 16/12/7.
 */
import VueRouter from 'vue-router'
import Vue from 'vue'
import routes from './routes'

Vue.use(VueRouter)

const router = new VueRouter({
    mode:'hash',
    routes
})

const toggleTabbar = function (type) {
    const tabbar = document.querySelector('#tabbar-content')
    if (tabbar){
        if (type==0){
            tabbar.style.display = 'inline'
        }else {
            tabbar.style.display = 'none'
        }

    }
}

//全局控制显示/隐藏 tabbar
router.beforeEach((to, from, next) => {
    const tabbarSet = new Set(['home','tree','find','mine'])
    if (tabbarSet.has(to.name)){
        toggleTabbar(0)
    }else {
        toggleTabbar(1)
    }

    // //过滤需要登录的路由(包括子路由)
    if (to.matched.some(record =>record.meta.requireAtuh)){
        let token = window.localStorage.getItem('token')
        if (!token){//未登录跳转到登录界面
            next({
                name: 'auth',
                query: { redirect: to.fullPath }
            })
        }else {
            next()
        }
    }else {
        next()
    }
})
export default router