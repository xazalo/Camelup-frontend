import type { StorageMap } from "@/types/game/cardStorage/StorageMap";
import type { BetStorage } from "@/types/game/cardStorage/BetStorage";

export interface CardStorage {
  winnerCards: BetStorage;
  loserCards: BetStorage;
  storedCards: StorageMap;
}