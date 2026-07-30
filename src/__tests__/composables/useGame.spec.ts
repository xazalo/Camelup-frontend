import { ref } from "vue";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useGame } from "../../composables/useGame";
import { Colors } from "../../types/game/Colors";

const game = ref<any>(null);
const lobby = ref<any>(null);

vi.mock("../../stores/game", () => ({
  useGameStore: () => ({
    get game() {
      return game.value;
    },
  }),
}));

vi.mock("../../stores/lobby", () => ({
  useLobbyStore: () => ({
    get lobby() {
      return lobby.value;
    },
  }),
}));

vi.mock("../../sockets/emit/startGame", () => ({
  startGame: vi.fn(),
}));

vi.mock("../../utils/storage", () => ({
  storage: {
    getName: vi.fn(),
  },
}));

vi.mock("../../utils/generatePayoutTable", () => ({
  default: vi.fn((value: number) => ({ payout: value })),
}));

import { startGame } from "../../sockets/emit/startGame";
import { storage } from "../../utils/storage";
import generatePayoutTable from "../../utils/generatePayoutTable";

const startGameMock = vi.mocked(startGame);
const getNameMock = vi.mocked(storage.getName);
const generatePayoutTableMock = vi.mocked(generatePayoutTable);

describe("useGame", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    game.value = null;
    lobby.value = null;

    getNameMock.mockReturnValue("John");
  });

  describe("start", () => {
    it("starts the game when the lobby has an id", () => {
      lobby.value = {
        id: "ABC123",
      };

      const { start } = useGame();

      start();

      expect(startGameMock).toHaveBeenCalledTimes(1);
      expect(startGameMock).toHaveBeenCalledWith("ABC123");
    });

    it("does nothing when there is no lobby id", () => {
      lobby.value = {};

      const { start } = useGame();

      start();

      expect(startGameMock).not.toHaveBeenCalled();
    });
  });

  describe("board", () => {
    it("returns the board", () => {
      const board = {
        spaces: [],
      };

      game.value = {
        board,
      };

      expect(useGame().board.value).toEqual(board);
    });

    it("returns undefined when there is no game", () => {
      expect(useGame().board.value).toBeUndefined();
    });
  });

  describe("rolledDices", () => {
    it("returns an empty array when there is no history", () => {
      game.value = {
        history: [],
      };

      expect(useGame().rolledDices.value).toEqual([]);
    });

    it("maps rolled dices from the last round", () => {
      game.value = {
        history: [
          {
            rolledDice: [
              {
                color: Colors.Red,
                number: 1,
              },
            ],
          },
          {
            rolledDice: [
              {
                color: Colors.Blue,
                number: 3,
              },
              {
                color: Colors.Green,
                number: 2,
              },
            ],
          },
        ],
      };

      expect(useGame().rolledDices.value).toEqual([
        {
          color: Colors.Blue,
          value: 3,
        },
        {
          color: Colors.Green,
          value: 2,
        },
      ]);
    });
  });

  describe("players", () => {
    it("returns the players", () => {
      const players = [
        {
          name: "John",
        },
      ];

      game.value = {
        players,
      };

      expect(useGame().players.value).toEqual(players);
    });
  });

  describe("availableActions", () => {
    it("returns the current player's available actions", () => {
      const actions = {
        rollDice: true,
      };

      game.value = {
        players: [
          {
            name: "John",
            availableActions: actions,
          },
          {
            name: "Peter",
            availableActions: {},
          },
        ],
      };

      expect(useGame().availableActions.value).toEqual(actions);
    });

    it("returns undefined when player is not found", () => {
      getNameMock.mockReturnValue("Unknown");

      game.value = {
        players: [],
      };

      expect(useGame().availableActions.value).toBeUndefined();
    });
  });

  describe("availableBetCards", () => {
    it("generates payout tables for every color", () => {
      game.value = {
        players: [],
      };

      const cards = useGame().availableBetCards.value;

      expect(generatePayoutTableMock).toHaveBeenCalledTimes(4);
      expect(generatePayoutTableMock).toHaveBeenCalledWith(5);

      expect(cards).toEqual({
        yellow: { payout: 5 },
        green: { payout: 5 },
        blue: { payout: 5 },
        red: { payout: 5 },
      });
    });

    it("reduces payouts according to taken cards", () => {
      game.value = {
        players: [
          {
            cards: [
              {
                camel: {
                  color: Colors.Blue,
                },
              },
              {
                camel: {
                  color: Colors.Blue,
                },
              },
              {
                camel: {
                  color: Colors.Red,
                },
              },
            ],
          },
        ],
      };

      useGame().availableBetCards.value;

      expect(generatePayoutTableMock).toHaveBeenCalledWith(3);
      expect(generatePayoutTableMock).toHaveBeenCalledWith(4);
      expect(generatePayoutTableMock).toHaveBeenCalledWith(5);
    });

    it("returns null when all cards of one color are taken", () => {
      game.value = {
        players: [
          {
            cards: Array.from({ length: 5 }, () => ({
              camel: {
                color: Colors.Yellow,
              },
            })),
          },
        ],
      };

      const cards = useGame().availableBetCards.value;

      expect(cards.yellow).toBeNull();
      expect(generatePayoutTableMock).toHaveBeenCalledTimes(3);
    });
  });
});