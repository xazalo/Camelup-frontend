<script setup lang="ts">
import type { Player } from "@/types/game/players/Player";
import { useGame } from "@/composables/useGame";
import PlayerView from "./PlayerView.vue";
const { players } = useGame();
</script>

<template>
  <PlayerView :players="players as Player[]" />
</template>