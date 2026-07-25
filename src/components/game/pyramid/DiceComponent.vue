<script setup lang="ts">
import type { Colors } from "@/types/game/Colors";

defineProps<{
  color: Colors;
  value: 1 | 2 | 3;
}>();
</script>

<template>
  <div class="dice" :style="{ background: color }">
    <span v-for="dot in value" :key="dot" class="dot"></span>
  </div>
</template>

<style scoped>
.dice {
  width: 42px;
  height: 42px;

  border-radius: 8px;
  border: 2px solid black;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);

  padding: 6px;
  gap: 2px;

  box-shadow: 0 2px 4px rgba(0,0,0,.3);
}

.dot {
  width: 8px;
  height: 8px;

  background: white;
  border-radius: 50%;

  justify-self: center;
  align-self: center;
}

.dot:nth-child(1) {
  grid-column: 2;
  grid-row: 2;
}

.dot:nth-child(2) {
  grid-column: 1;
  grid-row: 1;
}

.dot:nth-child(3) {
  grid-column: 3;
  grid-row: 3;
}
</style>