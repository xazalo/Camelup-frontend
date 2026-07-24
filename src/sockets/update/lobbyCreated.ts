import { socket } from "@/sockets/socket";
import type { Lobby } from "@/types/lobby/Lobby";

export function onLobbyCreated(callback: (data: Lobby) => void) {
  socket.on("lobbyCreated", (data) => {
    callback(data);
  });
}