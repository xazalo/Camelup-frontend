import { socket } from "@/sockets/socket";

export function onGameStarted(callback: (data: any) => void) {
  socket.on("gameStarted", (data) => {
    callback(data);
  });
}