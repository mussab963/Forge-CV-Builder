import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import Landing from './views/Landing.vue'
import Dashboard from './views/Dashboard.vue'
import Builder from './views/Builder.vue'
import Templates from './views/Templates.vue'
import './utils/theme'
import './styles.css'

const routes = [
  { path: '/', component: Landing },
  { path: '/templates', component: Templates },
  { path: '/dashboard', component: Dashboard },
  { path: '/builder/:id', component: Builder },
  { path: '/login', redirect: '/dashboard' },
  { path: '/ats-checker', redirect: '/templates' },
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

const router = createRouter({ history: createWebHistory(), routes, scrollBehavior: () => ({ top: 0 }) })
createApp(App).use(router).mount('#app')
