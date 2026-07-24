import type { Camel } from "@/types/game/board/Camel"
import type { Tile } from "@/types/game/board/Tile"

export interface Stack {
    camel: Camel[]
    tile: Tile
}