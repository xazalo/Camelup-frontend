import { onMounted, computed } from "vue";
import { useGameStore } from "@/stores/game";
import { onGameStarted } from "@/sockets/update/gameStarted";
import { onGameError } from "@/sockets/errors/gameError";
import { startGame } from "@/sockets/emit/startGame";

import { useLobbyStore } from "@/stores/lobby";

export function useGame() {
  const gameStore = useGameStore();
  const lobbyStore = useLobbyStore();

  function start() {
    if (!lobbyStore.lobby?.id) {
      alert("No lobby id");
      return;
    }

    startGame(lobbyStore.lobby?.id);
  }

  onMounted(() => {
    onGameStarted((game) => {
      gameStore.setGame(game);
    });

    onGameError((response) => {
      console.error(response);
      alert(response.message);
    });
  });

  const board = computed(() => gameStore.game?.board);

  return {
    game: gameStore.game,
    start,
    board,
  };
}
