<script setup lang="ts">
defineProps<{
  label: string;
  disabled?: boolean;
  type?: "normal" | "terminal" | "exit";
}>();

defineEmits<{
  click: [];
}>();
</script>

<template>
  <button
    class="action-btn"
    :class="type"
    :disabled="disabled"
    @click="$emit('click')"
  >
    {{ label }}
  </button>
</template>

<style scoped>
.action-btn {
  height: var(--control-height-md);
  padding: 0 var(--space-xl);

  border: none;
  border-radius: var(--radius-md);

  background: var(--color-secondary);
  color: var(--color-primary-text);

  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);

  cursor: pointer;
  transition: var(--transition-fast);
}

.action-btn:hover:not(:disabled) {
  transform: translateY(-2px);
}

.action-btn:disabled {
  background: var(--color-surface-alt);
  color: var(--color-text-muted);
  cursor: not-allowed;
  opacity: .6;
}


.terminal {
  background: black;
  color: #ffe100;
  font-family: monospace;
}

.terminal:hover {
  color: #00ffaa;
}


.exit {
  background: var(--color-danger);
  color: white;
}

.exit:hover {
  background: #a9433e;
}
</style>