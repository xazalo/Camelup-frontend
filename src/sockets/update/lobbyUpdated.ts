import { socket } from "@/sockets/socket";
import type { Lobby } from "@/types/lobby/Lobby";

export function onLobbyUpdated(callback: (data: Lobby) => void) {
  socket.on("lobbyUpdated", callback);
}