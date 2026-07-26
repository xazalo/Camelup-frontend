import { socket } from "@/sockets/socket";

export function onGameLaunched(onLaunch: () => void) {
  socket.on("launchGame", () => {
    onLaunch();
  });
}