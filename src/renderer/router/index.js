import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'book-list',
      component: require('@/components/BookList').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
