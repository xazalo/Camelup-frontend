import { onGameStarted } from "@/sockets/update/gameStarted";
import { onGameStateUpdated } from "@/sockets/update/gameState";
import { onGameLaunched } from "@/sockets/update/launchGame";
import { onPlayerId } from "@/sockets/update/playerId";
import { onPlayerTurn } from "@/sockets/update/playerTurn";
import { onWinnerPlayer } from "@/sockets/update/winnerPlayer";

import { onLobbyCreated } from "@/sockets/update/lobbyCreated";
import { onLobbyJoined } from "@/sockets/update/lobbyJoined";
import { onLobbyUpdated } from "@/sockets/update/lobbyUpdated";

import { onLog } from "@/sockets/log/onLog";

import { useGameStore } from "@/stores/game";
import { useLobbyStore } from "@/stores/lobby";

import { useLogs } from "@/composables/useLogs";
import { useToast } from "@/composables/useToast";
import { useFx } from "@/composables/useFx";
import { useSongs } from "@/composables/useSongs";

import { parseGameLogs, type ParsedLog } from "@/utils/logsParser";
import { storage } from "@/utils/storage";

import router from "@/router";

export function initSockets() {
  const gameStore = useGameStore();
  const lobbyStore = useLobbyStore();

  const { addLogs } = useLogs();
  const { show } = useToast();

  const fx = useFx();
  const { toggleMusic } = useSongs();

  // ===========================
  // GAME EVENTS
  // ===========================

  onGameStarted((game) => {
    gameStore.setGame(game);
  });

  onGameStateUpdated((game) => {
    gameStore.setGame(game);
  });

  onGameLaunched(() => {
    router.push({ name: "game" });
    toggleMusic();
  });

  // ===========================
  // PLAYER EVENTS
  // ===========================

  onPlayerId((data) => {
    storage.savePlayerId(data.playerId);
  });

  onPlayerTurn((player) => {
    const name = storage.getName();

    if (!name) return;

    if (name === player) {
      show({
        type: "INFO",
        message: "logs.yourTurn",
      });

      fx.play("your-turn");
    }
  });

  onWinnerPlayer((winner) => {
    const name = storage.getName();

    if (!name) return;
    toggleMusic();
    fx.play(name === winner ? "winner" : "loser");
  });

  // ===========================
  // LOBBY EVENTS
  // ===========================

  onLobbyCreated(({ id: lobbyId, players }) => {
    lobbyStore.setLobby({
      id: lobbyId,
      players,
    });

    if (!players[0]) return;

    storage.saveId(lobbyId);
    storage.saveName(players[0].name);
  });

  onLobbyJoined((data) => {
    storage.saveId(data.lobbyId);
    storage.saveName(data.playerName);
  });

  onLobbyUpdated((data) => {
    lobbyStore.setLobby({
      id: lobbyStore.lobby?.id ?? "",
      players: data.players,
    });
  });

  // ===========================
  // LOG EVENTS
  // ===========================

  onLog((data) => {
    const logs = parseGameLogs(data) as ParsedLog[];

    addLogs(logs);

    logs.forEach((log) => {
      show(log);
    });
  });
}
