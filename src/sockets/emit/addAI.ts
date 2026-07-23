import type { Player } from "@/types/Player";
import { socket } from "../socket";

export function addAI(gameId: string) {
    socket.emit("addAI", {
        gameId
    })
}