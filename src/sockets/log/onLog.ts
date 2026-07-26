import { socket } from "@/sockets/socket";

export function onLog(callback: (data: string) => void) {
  socket.on("gameLog", (data) => {
    callback(data);
  });
}
