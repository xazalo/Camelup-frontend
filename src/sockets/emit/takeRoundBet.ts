import { socket } from "@/sockets/socket";

export function takeRoundBet(data: {
    gameId: string;
    playerName: string;
    camelColor: string;
}) {
    socket.emit("takeRoundBet", data);
}