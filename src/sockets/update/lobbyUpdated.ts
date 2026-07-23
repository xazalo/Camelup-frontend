import { socket } from "../socket";

export function onLobbyUpdated(callback: (data: any) => void) {
  socket.on("lobbyUpdated", callback);
}