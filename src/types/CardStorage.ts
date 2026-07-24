interface StorageMap {
  yellow: { remaining: number };
  green: { remaining: number };
  blue: { remaining: number };
  red: { remaining: number };
}

interface Bet {
  player: string;
  order: number;
}

interface BetStorage {
  yellow: Bet[];
  green: Bet[];
  blue: Bet[];
  red: Bet[];
}

export interface CardStorage {
  winnerCards: BetStorage;
  loserCards: BetStorage;
  storedCards: StorageMap;
}