import { socket } from "@/sockets/socket";
import type { ErrorMessage } from "@/types/ErrorMessage";

export function onGameError(callback: (data: ErrorMessage) => void) {
  socket.on("gameError", callback);
}