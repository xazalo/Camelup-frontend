import { socket } from "@/sockets/socket";

export function onGameError(callback: (data: any) => void) {
  socket.on("gameError", callback);
}