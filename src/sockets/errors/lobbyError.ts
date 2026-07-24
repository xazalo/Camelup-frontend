import { socket } from "@/sockets/socket";
import type { ErrorMessage } from "@/types/ErrorMessage";

export function onLobbyError(callback: (data: ErrorMessage) => void) {
  socket.on("lobbyError", callback);
}