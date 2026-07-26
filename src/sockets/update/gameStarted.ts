import { socket } from "@/sockets/socket";
import type { Game } from "@/types/game/Game";

export function onGameStarted(callback: (data: Game) => void) {
  socket.on("gameStarted", (data) => {
    callback(data.state.game);
  });
}