import { TileType } from "@/types/TileType";

export interface Tile {
  owner: String | null;
  tileType: TileType;
}