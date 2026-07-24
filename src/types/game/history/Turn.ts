import type { Dice } from "@/types/game/history/Dice";
import type { Action } from "@/types/game/history/Actions";

export interface Turn {
  playerName: string;
  action: Action;
  dice: Dice | null;
}
