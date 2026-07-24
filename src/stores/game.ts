import { defineStore } from "pinia";
import { ref } from "vue";

import type { Game } from "@/types/Game";

export const useGameStore = defineStore("game", () => {
  const game = ref<Game | null>(null);

  function setGame(data: Game) {
    game.value = data;
  }

  function clearGame() {
    game.value = null;
  }

  return {
    game,
    setGame,
    clearGame
  };
});
