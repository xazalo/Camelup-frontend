import { socket } from "@/sockets/socket";

export function rollTheDice(data: { gameId: string; playerName: string }) {
  socket.emit("rollTheDice", data);
}