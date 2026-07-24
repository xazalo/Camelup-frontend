import { createRouter, createWebHistory } from 'vue-router'
import { useLobbyStore } from '@/stores/lobby'

import DefaultLayout from '@/layouts/DefaultLayout.vue'

import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import LobbyRoom from '@/components/lobby/LobbyRoom.vue'

const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: '/',
      component: DefaultLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: HomeView,
          meta: {
            requiresNoLobby: true,
          },
        },
        {
          path: 'about',
          name: 'about',
          component: AboutView,
        },
        {
          path: 'lobby',
          name: 'lobby',
          component: LobbyRoom,
        },
        {
          path: ':pathMatch(.*)*',
          name: 'not-found',
          component: () => import('@/views/NotFoundView.vue'),
        },
      ],
    },
  ],
})

router.beforeEach((to) => {
  const lobbyStore = useLobbyStore()

  if (to.meta.requiresNoLobby && lobbyStore.lobby) {
    return { name: 'lobby' }
  }

  if (to.name === 'lobby' && !lobbyStore.lobby) {
    return { name: 'home' }
  }
})

export default router