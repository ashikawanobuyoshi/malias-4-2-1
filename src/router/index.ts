import { createRouter, createWebHistory } from 'vue-router'
import TemplatePage from '@/views/TemplatePage.vue'
import ImageSelector from '@/components/ImageSelector.vue'

const routes = [
  {
    path: '/',
    name: 'ImageSelector',
    component: ImageSelector
  },
  {
    path: '/template',
    name: 'TemplatePage',
    component: TemplatePage
  }
]

const router = createRouter({
  history: createWebHistory(), // Web履歴モードを使用
  routes
})

export default router