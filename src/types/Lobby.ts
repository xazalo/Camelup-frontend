interface User {
    name: string,
    isAI: boolean
}

export interface Lobby {
  id: string
  players: User[]
}