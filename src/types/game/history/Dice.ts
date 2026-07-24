import { Colors } from "@/types/game/Colors";
import type { DiceValue } from "@/types/game/history/DiceValue";

export interface Dice {
  color: Colors;
  number: DiceValue;
}
