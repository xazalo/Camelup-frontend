import { socket } from "../socket";

export function onLobbyError(callback: (data: any) => void) {
  socket.on("lobbyError", callback);
}