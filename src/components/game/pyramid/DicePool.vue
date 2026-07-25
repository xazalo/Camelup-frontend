<script setup lang="ts">
import DiceComponent from "@/components/game/pyramid/DiceComponent.vue";
import type { Colors } from "@/types/game/Colors";

const props = defineProps<{
  dice: {
    color: Colors;
    value: 1 | 2 | 3;
  }[];
}>();

const slots = Array.from({ length: 5 });
</script>

<template>
  <div class="dice-pool">
    <div
      v-for="(_, index) in slots"
      :key="index"
      class="dice-slot"
    >
      <DiceComponent
        v-if="props.dice[index]"
        :color="props.dice[index].color"
        :value="props.dice[index].value"
      />
    </div>
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

.dice-slot {
  width: 42px;
  height: 42px;

  border-radius: 8px;
  border: 2px dashed rgb(0 0 0 / .25);
}
</style>