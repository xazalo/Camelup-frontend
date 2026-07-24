import { onMounted } from "vue";
import { useGameStore } from "@/stores/game";
import { onGameStarted } from "@/sockets/update/gameStarted";
import type { Game } from "@/types/game/Game";
import { onGameError } from "@/sockets/errors/gameError";
import { startGame } from "@/sockets/emit/startGame";

import { useLobbyStore } from "@/stores/lobby";

export function useGame() {
  const gameStore = useGameStore();
  const lobbyStore = useLobbyStore();

  function start() {
    if (!lobbyStore.lobby?.id) {
      alert("No lobby id")
      return
    } 
    
    startGame(lobbyStore.lobby?.id);
  }

  onMounted(() => {
    onGameStarted((game: Game) => {
      gameStore.setGame(game);
    });

    onGameError((response) => {
      console.error(response);
      alert(response.message);
    });
  });

  return {
    game: gameStore.game,
    start,
  };
}
