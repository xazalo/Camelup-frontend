import type { Bet } from "@/types/game/cardStorage/Bet";
import type { Camel } from "@/types/game/board/Camel";
import type { PayoutTable } from "@/types/game/players/PayoutTable";

export interface Card {
  type: Bet;
  camel: Camel;
  payouts: PayoutTable;
}
