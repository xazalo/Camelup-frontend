import { socket } from "@/sockets/socket";

export function onLobbyJoined(callback: (data: {lobbyId: string, playerName: string}) => void) {
  socket.on("lobbyJoined", callback);
}