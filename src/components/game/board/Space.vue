<script setup lang="ts">
import type { Stack } from "@/types/game/board/Stack";
import type { Camel } from "@/types/game/board/Camel";
import type { Tile } from "@/types/game/board/Tile";

defineProps<{
  space: Stack;
  index: number;
}>();
</script>

<template>
  <div class="space">
    <div class="number">{{ index + 1 }}</div>

    <Camel v-for="(camel, i) in space.camels" :key="camel.color" :camel="camel" :level="i" />

    <Tile v-if="space.tile.tileType !== 0" :tile="space.tile" />
  </div>
</template>

<style scoped>
.space {
  position: absolute;

  width: 60px;
  height: 60px;

  background: burlywood;
  border: 1px solid black;
  border-radius: 6px;
}

.number {
  position: absolute;
  top: 2px;
  left: 4px;
  font-size: 12px;
}
</style>
