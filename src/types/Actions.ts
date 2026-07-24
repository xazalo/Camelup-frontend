import { TileType } from "@/types/TileType";

export type Action =
  | { type: "RollDice" }
  | { type: "Bet"; cardId: string }
  | { type: "PlaceTile"; tileType: TileType; position: number };
