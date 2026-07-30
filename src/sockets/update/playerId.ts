import { socket } from "@/sockets/socket";

export function onPlayerId(callback: (data: {playerId: string}) => void) {
  socket.on("playerId", (data) => {
    callback(data);
  });
}