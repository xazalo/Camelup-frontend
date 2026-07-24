import type { Turn } from "@/types/game/history/Turn";
import type { Dice } from "@/types/game/history/Dice";
import type { DicePool } from "@/types/game/history/DicePool";

export interface Round {
  turns: Turn[];
  rolledDice: Dice[];
  dicePool: DicePool;
}
