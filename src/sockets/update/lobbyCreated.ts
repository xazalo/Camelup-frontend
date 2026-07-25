import { socket } from "@/sockets/socket";
import type { Lobby } from "@/types/lobby/Lobby";
import { useStorage } from "@/composables/useStorage";

export function onLobbyCreated(callback: (data: Lobby) => void) {
  socket.on("lobbyCreated", async (data) => {
    const { saveId, saveName } = useStorage();
    saveId(data.id);
    saveName(data.players[0].name);
    callback(data);
  });
}
