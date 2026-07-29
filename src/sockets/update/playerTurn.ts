import { socket } from "@/sockets/socket";
import type { Game } from "@/types/game/Game";

export function onPlayerTurn(callback: (data: string) => void) {
  socket.on("currentPlayer", (data) => {
    callback(data);
  });
}
