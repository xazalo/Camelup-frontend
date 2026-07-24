<script setup lang="ts">
import type { Camel } from "@/types/game/board/Camel";

defineProps<{
  camel: Camel;
  level: number;
}>();
</script>

<template>
  <div
    class="camel"
    :style="{
      background: camel.color,
      bottom: level * 10 + 'px',
    }"
  />
</template>

<style scoped>
.camel {
  position: absolute;

  width: 28px;
  height: 16px;

  left: 16px;

  border: 1px solid black;
}
</style>