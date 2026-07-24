import { socket } from "@/sockets/socket";

export function addAI(gameId: string) {
    socket.emit("addAI", {
        gameId
    })
}