import { socket } from "@/sockets/socket";

export function startGame(gameId: string) {
  socket.emit("startGame", { gameId });
}
