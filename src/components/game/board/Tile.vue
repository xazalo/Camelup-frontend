<script setup lang="ts">
import type { Tile } from "@/types/game/board/Tile";

defineProps<{
  tile: Tile;
}>();
</script>

<template>
  <div class="tile">
    <svg
      v-if="tile.tileType === 1"
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16 28C10 20 6 16 6 11a10 10 0 0 1 20 0c0 5-4 9-10 17Z"
        fill="#4fc3f7"
        stroke="#222"
        stroke-width="2"
      />
      <path
        d="M8 13c4-3 12-3 16 0"
        fill="none"
        stroke="#fff"
        stroke-width="2"
      />
    </svg>

    <svg
      v-else
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 22c5-8 17-8 22 0"
        fill="none"
        stroke="#d4a017"
        stroke-width="3"
        stroke-linecap="round"
      />
      <path
        d="M8 15c4-5 12-5 16 0"
        fill="none"
        stroke="#d4a017"
        stroke-width="3"
        stroke-linecap="round"
      />
      <path
        d="M11 8c3-3 7-3 10 0"
        fill="none"
        stroke="#d4a017"
        stroke-width="3"
        stroke-linecap="round"
      />
    </svg>
  </div>
</template>

<style scoped>
.tile {
  position: absolute;

  right: 4px;
  bottom: 4px;

  width: 22px;
  height: 22px;

  background: white;
  border: 1px solid black;

  display: flex;
  justify-content: center;
  align-items: center;
}

svg {
  width: 18px;
  height: 18px;
}
</style>