import Vue from 'vue'
import GlobalEvents from 'vue-global-events'

import App from './App'
import router from './router'
import store from './store'
import importFiles from './importFiles'

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

document.addEventListener('drop', (e) => {
  e.preventDefault()
  e.stopPropagation()

  for (const f of e.dataTransfer.files) {
    importFiles(f.path)
  }
})

document.addEventListener('dragover', (e) => {
  e.preventDefault()
  e.stopPropagation()
})
