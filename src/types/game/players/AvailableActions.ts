export interface AvailableActions {
  rollDice: boolean;

  roundBet: {
    blue:  boolean,
    green: boolean,
    red: boolean,
    yellow: boolean,
  }

  winnerBet: {
    blue: boolean,
    green: boolean,
    red: boolean,
    yellow: boolean,
  };

  loserBet: {
    blue: boolean,
    green: boolean,
    red: boolean,
    yellow: boolean,
  };

  placeTile: boolean[],
}