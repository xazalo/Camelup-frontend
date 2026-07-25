import { socket } from "@/sockets/socket";

export function createLobby(player: {name: string, isAI: boolean}) {
  socket.emit("createLobby", player);
}