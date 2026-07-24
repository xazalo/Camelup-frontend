<script setup lang="ts">
import { computed } from "vue";
import SpaceComponent from "@/components/game/board/SpaceComponent.vue";
import { useGame } from "@/composables/useGame";

const { board } = useGame();

const boardWidth = 600;
const boardHeight = 500;

const radiusX = 300;
const radiusY = 180;

const spaceSize = 60;

const positions = computed(() => {
  if (!board.value) return [];

  return board.value.spaces.map((_: unknown, index: number) => {
    const angle = (index / board!.value!.spaces.length) * Math.PI * 2 - Math.PI / 2;

    return {
      left: boardWidth / 2 + Math.cos(angle) * radiusX - spaceSize / 2,
      top: boardHeight / 2 + Math.sin(angle) * radiusY - spaceSize / 2,
    };
  });
});
</script>

<template>
  <div
    v-if="board"
    class="board"
    :style="{
      width: boardWidth + 'px',
      height: boardHeight + 'px',
    }"
  >
    <SpaceComponent
      v-for="(space, index) in board.spaces"
      :key="index"
      :space="space"
      :index="index"
      :style="{
        left: positions[index]!.left + 'px',
        top: positions[index]!.top + 'px',
      }"
    />
  </div>
</template>

<style scoped>
.board {
  position: relative;
  border-radius: 50%;
  margin: auto;
}
</style>
