import { socket } from "@/sockets/socket";
import type { Game } from "@/types/game/Game";

export function onGameStateUpdated(callback: (data: Game) => void) {
  socket.on("gameState", (data) => {
    callback(data.game);
  });
}