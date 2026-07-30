import { socket } from "@/sockets/socket";

export function onWinnerPlayer(callback: (data: string) => void) {
  socket.on("winner", (data) => {
    callback(data);
  });
}
