import { onMounted } from "vue";
import { useLobbyStore } from "@/stores/lobby";
import { createLobby } from "@/sockets/emit/createLobby";
import { joinLobby } from "@/sockets/emit/joinLobby";
import { onLobbyUpdated } from "@/sockets/update/lobbyUpdated";
import { onLobbyCreated } from "@/sockets/update/lobbyCreated";
import { onLobbyError } from "@/sockets/errors/lobbyError";
import { addAI } from "@/sockets/emit/addAI";

export function useLobby() {
  const lobbyStore = useLobbyStore();

  onMounted(() => {
    onLobbyCreated(({ lobbyId, players }) => {
      lobbyStore.setLobby({
        id: lobbyId,
        players,
      });
    });

    onLobbyUpdated((data) => {
      lobbyStore.setLobby({
        id: lobbyStore.lobby?.id ?? "",
        players: data.players,
      });
    });

    onLobbyError(({ message }) => {
      console.error(message);
      alert(message);
    });
  });

  function create(name: string) {
    createLobby({ name, isAI: false });
  }

  function join(gameId: string, playerName: string) {
    joinLobby(gameId, playerName);
  }

  function addOneAI(gameId: string) {
    addAI(gameId);
  }

  function startGame() {}

  return {
    lobby: lobbyStore.lobby,
    create,
    join,
    addOneAI,
    startGame,
  };
}
