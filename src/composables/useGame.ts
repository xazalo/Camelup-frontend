import { computed } from "vue";
import { useGameStore } from "@/stores/game";
import { startGame } from "@/sockets/emit/startGame";
import { useLobbyStore } from "@/stores/lobby";
import generatePayoutTable from "@/utils/generatePayoutTable";
import { Colors } from "@/types/game/Colors";

import { storage } from "@/utils/storage";

const betColors = [
  Colors.Yellow,
  Colors.Green,
  Colors.Blue,
  Colors.Red,
] as const;

export function useGame() {
  const gameStore = useGameStore();
  const lobbyStore = useLobbyStore();

  function start() {
    if (!lobbyStore.lobby?.id) {
      return;
    }
    startGame(lobbyStore.lobby.id);
  }

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

  const players = computed(() => gameStore.game?.players);

  const availableActions = computed(() => {
    const name = storage.getName();
    const player = gameStore.game?.players.find((p) => p.name === name);

    return player?.availableActions;
  });

  const availableBetCards = computed(() => {
    const taken = Object.fromEntries(
      betColors.map((color) => [color, 0]),
    ) as Record<(typeof betColors)[number], number>;

    for (const player of gameStore.game?.players ?? []) {
      for (const card of player.cards) {
        if (betColors.includes(card.camel.color as (typeof betColors)[number])) {
          taken[card.camel.color as (typeof betColors)[number]]++;
        }
      }
    }

    return Object.fromEntries(
      betColors.map((color) => [
        color,
        taken[color] < 5 ? generatePayoutTable(5 - taken[color]) : null,
      ]),
    ) as Record<
      (typeof betColors)[number],
      ReturnType<typeof generatePayoutTable> | null
    >;
  });

  return {
    game: gameStore.game,
    start,
    board,
    rolledDices,
    players,
    availableActions,
    availableBetCards,
  };
}