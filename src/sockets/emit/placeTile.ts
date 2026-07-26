import { socket } from "@/sockets/socket";

export function placeTile(data: {
    gameId: string;
    playerName: string;
    position: number;
    tileType: string;
}) {
    socket.emit("placeTile", data);
}