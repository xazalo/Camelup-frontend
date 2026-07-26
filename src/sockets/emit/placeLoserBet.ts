import { socket } from "@/sockets/socket";

export function placeLoserBet(data: {
    gameId: string;
    playerName: string;
    camelColor: string;
}) {
    socket.emit("placeLoserBet", data);
}