import { socket } from "@/sockets/socket";
import type { Game } from "@/types/game/Game";

export function onPlayerId(callback: (data: {playerId: string}) => void) {
  socket.on("playerId", (data) => {
    callback(data);
  });
}