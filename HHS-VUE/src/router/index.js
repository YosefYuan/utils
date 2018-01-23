import Vue from 'vue'
import Router from 'vue-router'
import HhsVue from '@/components/HhsVue'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'HhsVue',
    component: HhsVue
  }]
})
