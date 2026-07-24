<script setup lang="ts">
import { computed } from "vue";
import Space from "@/components/game/board/Space.vue";
import type { Board } from "@/types/game/board/Board";

const props = defineProps<{
  board: Board;
}>();

const boardSize = 600;
const radius = 240;
const spaceSize = 60;

const positions = computed(() => {
  return props.board.spaces.map((_, index) => {
    const angle =
      (index / props.board.spaces.length) * Math.PI * 2 - Math.PI / 2;

    return {
      left:
        boardSize / 2 +
        Math.cos(angle) * radius -
        spaceSize / 2,

      top:
        boardSize / 2 +
        Math.sin(angle) * radius -
        spaceSize / 2,
    };
  });
});
</script>

<template>
  <div
    class="board"
    :style="{
      width: boardSize + 'px',
      height: boardSize + 'px',
    }"
  >
    <Space
      v-for="(space, index) in board.spaces"
      :key="index"
      :space="space"
      :index="index"
      :style="{
        left: positions[index].left + 'px',
        top: positions[index].top + 'px',
      }"
    />
  </div>
</template>

<style scoped>
.board {
  position: relative;
  border: 2px solid black;
  border-radius: 50%;
  margin: auto;
}
</style>