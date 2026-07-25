export interface AvailableActions {
  rollDice: boolean;

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

  placeTile: boolean;
}