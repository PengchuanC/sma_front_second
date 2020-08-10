import Vue from 'vue'
import App from './App.vue'

import router from './router'
import SuiVue from 'semantic-ui-vue'
import echarts from 'echarts'
import {Modal, Table} from "view-design";

import 'semantic-ui-css/semantic.min.css'
import 'view-design/dist/styles/iview.css'
import './common/iconfont'

Vue.config.productionTip = false
Vue.use(SuiVue)
Vue.use(echarts)

Vue.component('Modal', Modal)
Vue.component('Table', Table)

Vue.prototype.$chart = echarts

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
