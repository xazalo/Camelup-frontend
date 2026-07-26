import { useLobbyStore } from "@/stores/lobby";
import { createLobby } from "@/sockets/emit/createLobby";
import { joinLobby } from "@/sockets/emit/joinLobby";
import { addAI } from "@/sockets/emit/addAI";

export function useLobby() {
  const lobbyStore = useLobbyStore();

  function create(name: string) {
    createLobby({ name, isAI: false });
  }

  function join(gameId: string, playerName: string) {
    joinLobby(gameId, playerName);
  }

  function addOneAI(gameId: string) {
    addAI(gameId);
  }

  return {
    lobby: lobbyStore.lobby,
    create,
    join,
    addOneAI,
  };
}
