<script setup lang="ts">
defineProps<{
  colors?: Record<string, boolean>;
}>();

const emit = defineEmits<{
  select: [color: string];
  close: [];
}>();
</script>

<template>
  <div class="overlay" @click.self="emit('close')">
    <div class="dialog">
      <h2>{{ $t("colorSelector.title") }}</h2>

      <div class="color-grid">
        <button
          v-for="(enabled, color) in colors"
          :key="color"
          class="color-btn"
          :disabled="!enabled"
          @click="emit('select', color)"
        >
          <span class="color-preview" :style="{ background: color }"></span>
        </button>
      </div>

      <button class="cancel-btn" @click="emit('close')">
        {{ $t("colorSelector.cancel") }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(74, 53, 34, 0.45);
  z-index: 200;
}

.dialog {
  width: min(420px, 90vw);
  background: var(--color-surface);
  border: var(--border-width) solid var(--color-border);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
  overflow: hidden;
}

.dialog h2 {
  margin: 0;
  padding: var(--space-xl);
  background: var(--color-primary);
  color: var(--color-primary-text);
  text-align: center;
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
}

.color-grid {
  display:grid;
  grid-template-columns:repeat(4,1fr);
  gap:var(--space-lg);
  padding:var(--space-2xl);
}

.color-btn {
  height:64px;
  display:flex;
  justify-content:center;
  align-items:center;
  border:var(--border-width) solid var(--color-border);
  border-radius:var(--radius-lg);
  background:var(--color-background);
  cursor:pointer;
  transition:var(--transition-fast);
  box-shadow:var(--shadow-sm);
}

.color-btn:hover:not(:disabled) {
  transform:translateY(-3px);
  border-color:var(--color-primary);
  box-shadow:var(--shadow-md);
}

.color-btn:disabled {
  opacity:.35;
  cursor:not-allowed;
}

.color-preview {
  width:36px;
  height:36px;
  border-radius:var(--radius-full);
  border:3px solid var(--color-surface);
  box-shadow:0 0 0 2px var(--color-border);
}

.cancel-btn {
  width: calc(100% - var(--space-2xl) * 2);
  margin: 0 var(--space-2xl) var(--space-2xl);
  height: var(--control-height-md);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-surface-alt);
  color: var(--color-text-muted);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  cursor: pointer;
  transition: var(--transition-fast);
}

.cancel-btn:hover {
  background: var(--color-primary);
  color: var(--color-primary-text);
  border-color: var(--color-primary);
}

@media (max-width: 640px) {
  .color-grid {
    grid-template-columns: 1fr;
  }
}
</style>
