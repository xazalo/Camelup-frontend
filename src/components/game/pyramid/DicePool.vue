<script setup lang="ts">
import DiceComponent from "@/components/game/pyramid/DiceComponent.vue";
import type { Colors } from "@/types/game/Colors";

defineProps<{
  dice: {
    color: Colors;
    value: 1 | 2 | 3;
  }[];
}>();
</script>

<template>
  <div class="dice-pool">
    <DiceComponent
      v-for="(die, index) in dice.slice(0, 5)"
      :key="index"
      :color="die.color"
      :value="die.value"
    />
  </div>
</template>

<style scoped>
.dice-pool {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: var(--space-md);
}
</style>