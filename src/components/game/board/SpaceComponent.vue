<script setup lang="ts">
import type { Stack } from "@/types/game/board/Stack";
import TileComponent from "@/components/game/board/TileComponent.vue"
import CamelComponent from "@/components/game/board/CamelComponent.vue";

const props = defineProps<{
  space: Stack;
  index: number;
}>();

</script>

<template>
  <div class="space">
    <div class="number">{{ index + 1 }}</div>
    <CamelComponent v-for="(camel, i) in props.space.camels" :key="camel.color" :camel="camel" :level="i" />
    <TileComponent v-if="props.space.tile.tileType !== 0" :tile="props.space.tile" />
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
