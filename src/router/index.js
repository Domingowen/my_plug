import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/components/index';
import SliderNav from '@/components/slider_nav';
Vue.use(Router);
export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/nav'
    },
    {
      path: '/index',
      name: 'index',
      component: Index
    },
    {
      path: '/nav',
      name: 'nav',
      component: SliderNav
    }
  ]
});
