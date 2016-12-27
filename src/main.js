import Vue from 'vue'
import App from './App'
import VueResource from 'vue-resource'
import router from './router'

Vue.config.debug = true

Vue.use(VueResource)

//默认开启参数json格式化
Vue.http.options.emulateJSON = true;

const app = new Vue({
    router,
    render:h=>h(App)
}).$mount('#app')
