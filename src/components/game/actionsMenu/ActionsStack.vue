<script setup lang="ts">
import ActionButton from "./ActionButton.vue";

interface Action {
  key: string;
  label: string;
  enabled: boolean;
}

defineProps<{
  actions: Action[];
}>();

const emit = defineEmits<{
  action: [key: string];
}>();


function getType(key: string) {
  if (key === "exit") return "exit";

  return "normal";
}
</script>


<template>
  <div class="actions-menu">

    <ActionButton
      v-for="action in actions"
      :key="action.key"
      :label="action.label"
      :disabled="!action.enabled"
      :type="getType(action.key)"
      @click="emit('action', action.key)"
    />

  </div>
</template>

<style scoped>
.actions-menu {
  position: fixed;
  left: var(--space-xl);
  right: var(--space-xl);
  bottom: var(--space-xl);
  display: flex;
  justify-content: center;
  gap: var(--space-md);
  padding: var(--space-lg);
  background: var(--color-surface);
  border: var(--border-width) solid var(--color-border);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
  z-index:100;
}
</style>