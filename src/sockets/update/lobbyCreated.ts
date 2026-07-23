import { socket } from "../socket";

export function onLobbyCreated(callback: (data: any) => void) {
  socket.on("lobbyCreated", (data) => {
    callback(data);
  });
}