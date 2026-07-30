import { rollTheDice } from "@/sockets/emit/rollTheDice";
import { takeRoundBet } from "@/sockets/emit/takeRoundBet";
import { placeWinnerBet } from "@/sockets/emit/placeWinnerBet";
import { placeTile } from "@/sockets/emit/placeTile";
import { placeLoserBet } from "@/sockets/emit/placeLoserBet";
import { storage } from "@/utils/storage";
import { useFx } from "./useFx";

export function useActions() {
  const fx = useFx();

  function getPlayerData() {
    const gameId = storage.getId();
    const playerName = storage.getName();
    const playerId = storage.getPlayerId();

    if (
      typeof gameId !== "string" ||
      typeof playerName !== "string" ||
      typeof playerId !== "string"
    ) {
      console.error("Missing player data");
      return null;
    }

    return {
      gameId,
      playerName,
      playerId,
    };
  }

  function rollTheDiceAction() {
    const player = getPlayerData();
    if (!player) return;

    fx.play("roll-dice");

    rollTheDice(player);
  }

  function takeRoundBetAction(camelColor: string) {
    const player = getPlayerData();

    if (!player) return;

    fx.play("bet");

    takeRoundBet({
      ...player,
      camelColor,
    });
  }

  function placeWinnerBetAction(camelColor: string) {
    const player = getPlayerData();

    if (!player) return;

    fx.play("bet");

    placeWinnerBet({
      ...player,
      camelColor,
    });
  }

  function placeLoserBetAction(camelColor: string) {
    const player = getPlayerData();

    if (!player) return;

    fx.play("bet");

    placeLoserBet({
      ...player,
      camelColor,
    });
  }

  function placeTileAction(position: number, tileType: number) {
    const player = getPlayerData();

    if (!player) return;

    fx.play("place-tile");

    placeTile({
      ...player,
      position,
      tileType,
    });
  }

  return {
    rollTheDiceAction,
    takeRoundBetAction,
    placeWinnerBetAction,
    placeLoserBetAction,
    placeTileAction,
  };
}
