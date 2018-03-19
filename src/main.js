// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
Vue.config.productionTip = false;
window.addEventListener('load', () => {
  let fontSize = document.documentElement.clientWidth / 10;
  document.documentElement.style.fontSize = fontSize + 'px';
  document.body.style.fontSize = fontSize + 'px';
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
