<script setup lang="ts">
import { ref } from "vue";
import type { Player } from "@/types/game/players/Player";
import { useGame } from "@/composables/useGame";

import PlayerView from "./PlayerView.vue";
import PlayerBets from "./PlayerBets.vue";

const { players } = useGame();

const selectedPlayer = ref<Player | null>(null);

function openPlayerBets(player: Player) {
  selectedPlayer.value = player;
}

function closePlayerBets() {
  selectedPlayer.value = null;
}
</script>

<template>
  <PlayerView
    :players="players as Player[]"
    @select="openPlayerBets"
  />

  <PlayerBets
    v-if="selectedPlayer"
    :player="selectedPlayer"
    @close="closePlayerBets"
  />
</template>