import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';


import Hello from './components/Hello.vue';
import Homepage from './components/Homepage.vue';

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {path: '/hello', component : Hello},
    {path: '/', component: Homepage}
  ]
});

new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
})
