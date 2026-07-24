import type { User } from "@/types/lobby/User"

export interface Lobby {
  id: string
  players: User[]
}