import type { Turn } from "@/types/Turn";
import type { Dice } from "@/types/Dice";
import type { DicePool } from "@/types/DicePool";

export interface Round {
  turns: Turn[];
  rolledDice: Dice[];
  dicePool: DicePool;
}
