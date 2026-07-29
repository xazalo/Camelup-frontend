import { onGameStarted } from "@/sockets/update/gameStarted";
import { onGameStateUpdated } from "@/sockets/update/gameState";
import { useGameStore } from "@/stores/game";

import { onLobbyCreated } from "@/sockets/update/lobbyCreated";
import { onLobbyJoined } from "@/sockets/update/lobbyJoined";
import { onLobbyUpdated } from "@/sockets/update/lobbyUpdated";
import { useLobbyStore } from "@/stores/lobby";

import { onLog } from "@/sockets/log/onLog";
import { parseGameLogs, type ParsedLog } from "@/utils/logsParser";
import { useLogs } from "@/composables/useLogs";
import { useToast } from "@/composables/useToast";

import { storage } from "@/utils/storage";
import { onGameLaunched } from "@/sockets/update/launchGame";

import router from "@/router";
import { onPlayerId } from "@/sockets/update/playerId";
import { onPlayerTurn } from "@/sockets/update/playerTurn";

export function initGame() {
  const gameStore = useGameStore();

  onGameStarted((game) => {
    gameStore.setGame(game);
  });

  onPlayerId((data) => {
    storage.savePlayerId(data.playerId);
  });

  onGameLaunched(() => {
    router.push({ name: "game" });
  });

  onGameStateUpdated((game) => {
    gameStore.setGame(game);
  });
}

export function initLobby() {
  const lobbyStore = useLobbyStore();

  onLobbyCreated(({ id: lobbyId, players }) => {
    lobbyStore.setLobby({
      id: lobbyId,
      players,
    });

    if (!players[0]) {
      return;
    }

    storage.saveId(lobbyId);
    storage.saveName(players[0]?.name);
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
}

export function initLogs() {
  const { addLogs } = useLogs();
  const { show } = useToast();

  onLog((data) => {
    const logs = parseGameLogs(data) as ParsedLog[];

    addLogs(logs);

    logs.forEach((log) => {
      show(log);
    });
  });

  onPlayerTurn((player) => {
    const isPlayer = storage.getName();
    if (isPlayer === undefined) return;
    if (isPlayer === player) show({type: "INFO", message: "logs.yourTurn"});
    //todo: add music effects
  });
}
