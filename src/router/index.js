import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/components/index';
import SliderNav from '@/components/slider_nav';
import PicTouch from '@/components/pic_touch';
import Carousel from '@/components/carousel';
import QQContact from '@/components/qq_contact';
Vue.use(Router);
export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/qq'
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
    },
    {
      path: '/pictouch',
      name: 'pictouch',
      component: PicTouch
    },
    {
      path: '/carousel',
      name: 'carousel',
      component: Carousel
    },
    {
      path: '/qq',
      name: 'qq',
      component: QQContact
    }
  ]
});
