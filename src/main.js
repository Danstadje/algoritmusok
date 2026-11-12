import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import AlgoPage from './components/AlgoPage.vue'
import { permutation, distinct } from './data/algorithms.js'
import './style.css'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', redirect: '/permutation' },
    { path: '/permutation', component: AlgoPage, props: { page: permutation } },
    { path: '/distinct', component: AlgoPage, props: { page: distinct } },
  ],
})
createApp(App).use(router).mount('#app')
