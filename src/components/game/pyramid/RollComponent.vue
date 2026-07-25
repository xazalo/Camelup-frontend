<script setup lang="ts">
import DicePool from "@/components/game/pyramid/DicePool.vue";
import PyramidComponent from "@/components/game/pyramid/PyramidComponent.vue";
import { useGame } from "@/composables/useGame.ts";

const { rolledDices } = useGame();
</script>

<template>
  <section class="roll">
    <PyramidComponent></PyramidComponent>
    <DicePool :dice="rolledDices" />
  </section>
</template>

<style scoped>
.roll {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-md);
}

h2 {
  margin: 0;
  font-size: var(--font-size-xl);
}
</style>
