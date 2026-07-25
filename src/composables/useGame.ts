import { onMounted, computed } from "vue";
import { useGameStore } from "@/stores/game";
import { onGameStarted } from "@/sockets/update/gameStarted";
import { onGameError } from "@/sockets/errors/gameError";
import { startGame } from "@/sockets/emit/startGame";
import { useLobbyStore } from "@/stores/lobby";
import { useStorage } from "./useStorage";

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

  const rolledDices = computed(() => {
    const rounds = gameStore.game?.history;

    if (!rounds || rounds.length === 0) {
      return [];
    }

    const lastRound = rounds[rounds.length - 1];

    return lastRound!.rolledDice.map((dice) => ({
      color: dice.color,
      value: dice.number,
    }));
  });

  const players = computed(() => {
    return gameStore.game?.players;
  });

  const availableActions = computed(() => {
    const { getName } = useStorage();
    const name = getName();

    const player = gameStore.game?.players.find((p) => p.name === name);

    return player?.availableActions;
  });

  return {
    game: gameStore.game,
    start,
    board,
    rolledDices,
    players,
    availableActions,
  };
}
