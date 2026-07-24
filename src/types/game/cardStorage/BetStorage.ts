import type { Bet } from "@/types/game/cardStorage/Bet";

export interface BetStorage {
  yellow: Bet[];
  green: Bet[];
  blue: Bet[];
  red: Bet[];
}