import type { Player } from "@/types/Player";
import type { Board } from "@/types/Board";
import type { CardStorage } from "@/types/CardStorage";
import type { GamePhase } from "@/types/GamePhase";
import type { Round } from "@/types/Round";

export interface Game {
  id: string;
  board: Board
  players: Player[];

  currentTurn: number;
  currentPlayer: number;
  phase: GamePhase;

  cardStorage: CardStorage;

  history: Round[]
}
