import { beforeEach, describe, expect, it, vi } from "vitest";
import { useActions } from "../../composables/useActions";

const rollTheDice = vi.fn();
const takeRoundBet = vi.fn();
const placeWinnerBet = vi.fn();
const placeLoserBet = vi.fn();
const placeTile = vi.fn();

const play = vi.fn();

const getId = vi.fn();
const getName = vi.fn();
const getPlayerId = vi.fn();

vi.mock("../../sockets/emit/rollTheDice", () => ({
  rollTheDice: (...args: unknown[]) => rollTheDice(...args),
}));

vi.mock("../../sockets/emit/takeRoundBet", () => ({
  takeRoundBet: (...args: unknown[]) => takeRoundBet(...args),
}));

vi.mock("../../sockets/emit/placeWinnerBet", () => ({
  placeWinnerBet: (...args: unknown[]) => placeWinnerBet(...args),
}));

vi.mock("../../sockets/emit/placeLoserBet", () => ({
  placeLoserBet: (...args: unknown[]) => placeLoserBet(...args),
}));

vi.mock("../../sockets/emit/placeTile", () => ({
  placeTile: (...args: unknown[]) => placeTile(...args),
}));

vi.mock("../../utils/storage", () => ({
  storage: {
    getId: (...args: unknown[]) => getId(...args),
    getName: (...args: unknown[]) => getName(...args),
    getPlayerId: (...args: unknown[]) => getPlayerId(...args),
  },
}));

vi.mock("../../composables/useFx", () => ({
  useFx: () => ({
    play,
  }),
}));

describe("useActions", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    getId.mockReturnValue("GAME1");
    getName.mockReturnValue("John");
    getPlayerId.mockReturnValue("PLAYER1");
  });


  describe("rollTheDiceAction", () => {
    it("plays fx and rolls dice", () => {
      const { rollTheDiceAction } = useActions();

      rollTheDiceAction();

      expect(play).toHaveBeenCalledWith("roll-dice");

      expect(rollTheDice).toHaveBeenCalledWith({
        gameId: "GAME1",
        playerName: "John",
        playerId: "PLAYER1",
      });
    });
  });


  describe("takeRoundBetAction", () => {
    it("places a round bet", () => {
      const { takeRoundBetAction } = useActions();

      takeRoundBetAction("red");

      expect(play).toHaveBeenCalledWith("bet");

      expect(takeRoundBet).toHaveBeenCalledWith({
        gameId: "GAME1",
        playerName: "John",
        playerId: "PLAYER1",
        camelColor: "red",
      });
    });
  });


  describe("placeWinnerBetAction", () => {
    it("places a winner bet", () => {
      const { placeWinnerBetAction } = useActions();

      placeWinnerBetAction("blue");

      expect(play).toHaveBeenCalledWith("bet");

      expect(placeWinnerBet).toHaveBeenCalledWith({
        gameId: "GAME1",
        playerName: "John",
        playerId: "PLAYER1",
        camelColor: "blue",
      });
    });
  });


  describe("placeLoserBetAction", () => {
    it("places a loser bet", () => {
      const { placeLoserBetAction } = useActions();

      placeLoserBetAction("yellow");

      expect(play).toHaveBeenCalledWith("bet");

      expect(placeLoserBet).toHaveBeenCalledWith({
        gameId: "GAME1",
        playerName: "John",
        playerId: "PLAYER1",
        camelColor: "yellow",
      });
    });
  });


  describe("placeTileAction", () => {
    it("places a tile", () => {
      const { placeTileAction } = useActions();

      placeTileAction(5, 2);

      expect(play).toHaveBeenCalledWith("place-tile");

      expect(placeTile).toHaveBeenCalledWith({
        gameId: "GAME1",
        playerName: "John",
        playerId: "PLAYER1",
        position: 5,
        tileType: 2,
      });
    });
  });


  describe("invalid player data", () => {
    it("does nothing when storage data is missing", () => {
      getId.mockReturnValue(null);

      const error = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});

      const { rollTheDiceAction } = useActions();

      rollTheDiceAction();

      expect(play).not.toHaveBeenCalled();
      expect(rollTheDice).not.toHaveBeenCalled();

      expect(error).toHaveBeenCalledWith(
        "Missing player data",
      );

      error.mockRestore();
    });
  });
});