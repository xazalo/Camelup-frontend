import { defineStore } from 'pinia'
import { ref } from 'vue'

import type { Lobby } from '@/types/lobby/Lobby'


export const useLobbyStore = defineStore('lobby', () => {

  const lobby = ref<Lobby | null>(null)


  function setLobby(data: Lobby) {
    lobby.value = data
  }


  function clearLobby() {
    lobby.value = null
  }


  return {
    lobby,
    setLobby,
    clearLobby
  }

})