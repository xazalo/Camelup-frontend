import { TileType } from "@/types/game/TileType";

export interface Tile {
  owner: string | null;
  tileType: TileType;
}