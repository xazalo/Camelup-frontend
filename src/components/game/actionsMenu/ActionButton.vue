<script setup lang="ts">
defineProps<{
  label: string;
  disabled?: boolean;
  type?: "normal" | "exit";
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

  border: 2px solid rgba(0, 0, 0, 0.08);
  border-radius: var(--radius-md);

  background: var(--color-wood);
  color: var(--color-primary-text);

  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-bold);
  letter-spacing: .4px;

  box-shadow:
    inset 0 1px 0 rgba(255,255,255,.18),
    0 4px 10px var(--color-shadow-md);

  cursor: pointer;
  transition: var(--transition-fast);
}

.action-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,.18),
    0 8px 16px var(--color-shadow-md);
}

.action-btn:active:not(:disabled) {
  transform: translateY(1px);
  box-shadow:
    inset 0 2px 6px rgba(0,0,0,.15);
}

.action-btn:disabled {
  background: linear-gradient(
    to bottom,
    var(--color-surface),
    var(--color-surface-alt)
  );

  border-color: var(--color-border);

  color: var(--color-text-muted);

  box-shadow: none;

  opacity: .65;
  cursor: not-allowed;
}

.exit {
  background: linear-gradient(
    to bottom,
    var(--color-danger),
    #a94442
  );
}

.exit:hover:not(:disabled) {
  background: linear-gradient(
    to bottom,
    #d66b66,
    var(--color-danger)
  );
}
</style>