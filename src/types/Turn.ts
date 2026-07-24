import type { Dice } from "@/types/Dice";
import type { Action } from "@/types/Actions";

export interface Turn {
  playerName: string;
  action: Action;
  dice: Dice | null;
}
