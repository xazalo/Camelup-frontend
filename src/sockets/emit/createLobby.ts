import type { Player } from "@/types/Player";
import { socket } from "../socket";

export function createLobby(player: Player) {
  socket.emit("createLobby", player);
}