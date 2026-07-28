import type { Player } from "@/types/game/players/Player";
import type { Board } from "@/types/game/board/Board";
import type { GamePhase } from "@/types/game/phase/GamePhase";
import type { Round } from "@/types/game/history/Round";

export interface Game {
  id: string;
  board: Board
  players: Player[];

  currentTurn: number;
  currentPlayer: number;
  phase: GamePhase;

  history: Round[]
}
