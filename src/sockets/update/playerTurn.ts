import { socket } from "@/sockets/socket";

export function onPlayerTurn(callback: (data: string) => void) {
  socket.on("currentPlayer", (data) => {
    callback(data);
  });
}
