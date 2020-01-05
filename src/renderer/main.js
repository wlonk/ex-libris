import Vue from 'vue'
import GlobalEvents from 'vue-global-events'

import App from './App'
import router from './router'
import store from './store'

import 'bulma/css/bulma.css'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false
Vue.component('GlobalEvents', GlobalEvents)

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
