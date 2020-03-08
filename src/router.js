import Vue from 'vue';
import Router from 'vue-router';
import Tools from './components/Tools.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Tools',
      component: Tools,
      meta: {
          title: 'Ferramentas | Listar Todas'
      }
    }
  ],
});