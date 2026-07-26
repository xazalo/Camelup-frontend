import { socket } from "@/sockets/socket";

export function placeWinnerBet(data: {
    gameId: string;
    playerName: string;
    camelColor: string;
}) {
    socket.emit("placeWinnerBet", data);
}