import { createRouter, createWebHistory } from "vue-router";
import { useLobbyStore } from "@/stores/lobby";
import { useGameStore } from "@/stores/game";

import DefaultLayout from "@/layouts/DefaultLayout.vue";
import GameLayout from "@/layouts/GameLayout.vue";

import HomeView from "@/views/HomeView.vue";
import AboutView from "@/views/AboutView.vue";
import GameView from "@/views/GameView.vue";
import LobbyView from "@/views/LobbyView.vue";
import NotFoundView from "@/views/NotFoundView.vue";

const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: "/",
      component: DefaultLayout,
      children: [
        {
          path: "",
          name: "home",
          component: HomeView,
          meta: {
            requiresNoLobby: true,
          },
        },
        {
          path: "about",
          name: "about",
          component: AboutView,
        },
        {
          path: "lobby",
          name: "lobby",
          component: LobbyView,
        },
        {
          path: "/:pathMatch(.*)*",
          name: "not-found",
          component: NotFoundView,
        },
      ],
    },

    {
      path: "/game",
      component: GameLayout,
      children: [
        {
          path: "",
          name: "game",
          component: GameView,
          meta: {
            requiresGame: true,
          },
        },
      ],
    },
  ],
});

router.beforeEach((to) => {
  const lobbyStore = useLobbyStore();
  const gameStore = useGameStore();

  if (to.meta.requiresGame && !gameStore.game) {
    return { name: "home" };
  }

  if (to.meta.requiresNoLobby && lobbyStore.lobby) {
    return { name: "lobby" };
  }

  if (to.name === "lobby" && !lobbyStore.lobby) {
    return { name: "home" };
  }
});

export default router;
