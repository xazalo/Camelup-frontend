import type { Player } from "@/types/game/players/Player";
import { socket } from "@/sockets/socket";

export function createLobby(player: Player) {
  socket.emit("createLobby", player);
}