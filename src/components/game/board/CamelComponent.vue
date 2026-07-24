<script setup lang="ts">
import type { Camel } from "@/types/game/board/Camel";

defineProps<{
  camel: Camel;
  level: number;
}>();
</script>

<template>
  <svg
    class="camel"
    :style="{ bottom: level * 10 + 'px' }"
    viewBox="0 0 64 64"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g :fill="camel.color" stroke="#222" stroke-width="2">
      <ellipse cx="32" cy="36" rx="16" ry="10" />
      <circle cx="48" cy="22" r="6" />
      <rect x="42" y="24" width="8" height="10" rx="3" />
      <polygon points="46,14 43,6 49,10 53,6 51,14" />
      <rect x="22" y="42" width="3" height="14" rx="1" />
      <rect x="30" y="42" width="3" height="14" rx="1" />
      <rect x="38" y="42" width="3" height="14" rx="1" />
      <rect x="46" y="42" width="3" height="14" rx="1" />
      <path d="M18 34 C12 28 14 20 22 22" fill="none" />
    </g>
    <circle cx="50" cy="21" r="1.2" fill="#000" />
  </svg>
</template>

<style scoped>
.camel {
  position: absolute;
  left: 8px;
  width: 48px;
  height: 48px;
}
</style>