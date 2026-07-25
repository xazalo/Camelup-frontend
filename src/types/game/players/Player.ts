import type { Card } from "@/types/game/players/Card";
import type { AvailableActions } from "@/types/game/players/AvailableActions";

type Player = {
  name: string;
  money: number;
  cards: Card[];
  placedTile: boolean;
  availableActions: AvailableActions;
  isAI: boolean;
};

export { type Player };
