import { rollTheDice } from "@/sockets/emit/rollTheDice";
import { takeRoundBet } from "@/sockets/emit/takeRoundBet";
import { placeWinnerBet } from "@/sockets/emit/placeWinnerBet";
import { placeTile } from "@/sockets/emit/placeTile";
import { placeLoserBet } from "@/sockets/emit/placeLoserBet";
import { storage } from "@/utils/storage";

export function useActions() {

    function getPlayerData() {
        const gameId = storage.getId();
        const playerName = storage.getName();

        if (
            typeof gameId !== "string" ||
            typeof playerName !== "string"
        ) {
            console.error("Missing player data");
            return null;
        }

        return {
            gameId,
            playerName,
        };
    }


    function rollTheDiceAction() {
        const player = getPlayerData();
        if (!player) return;

        rollTheDice(player);
    }


    function takeRoundBetAction(camelColor: string) {
        const player = getPlayerData();

        if (!player) return;

        takeRoundBet({
            ...player,
            camelColor,
        });
    }


    function placeWinnerBetAction(camelColor: string) {
        const player = getPlayerData();

        if (!player) return;

        placeWinnerBet({
            ...player,
            camelColor,
        });
    }


    function placeLoserBetAction(camelColor: string) {
        const player = getPlayerData();

        if (!player) return;

        placeLoserBet({
            ...player,
            camelColor,
        });
    }


    function placeTileAction(
        position: number,
        tileType: string,
    ) {
        const player = getPlayerData();

        if (!player) return;

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