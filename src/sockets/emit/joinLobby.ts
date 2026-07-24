import { socket } from "@/sockets/socket";

export function joinLobby(gameId: string, playerName: string) {
  socket.emit("joinLobby", {
    gameId,
    playerName,
  });
}
