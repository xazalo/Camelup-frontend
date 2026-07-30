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
.dialog {
  width: min(420px, 90vw);

  background: var(--color-surface-alt);
  border: 4px solid var(--color-primary);
  border-radius: var(--radius-xl);

  overflow: hidden;
  box-shadow: 0 18px 40px var(--color-shadow-md);
}

.dialog h2 {
  margin: 0;
  padding: var(--space-xl);

  background: var(--color-primary);
  color: var(--color-primary-text);

  text-align: center;
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  letter-spacing: 1px;
}

.color-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);

  gap: var(--space-lg);
  padding: var(--space-2xl);
}

.color-btn {
  height: 72px;

  display: flex;
  justify-content: center;
  align-items: center;

  background: linear-gradient(
    var(--color-surface),
    var(--color-background)
  );

  border: 3px solid var(--color-accent);
  border-radius: var(--radius-lg);

  cursor: pointer;
  transition: var(--transition-fast);

  box-shadow: 0 6px 14px var(--color-shadow-md);
}

.color-btn:hover:not(:disabled) {
  transform: translateY(-5px) rotate(-2deg);
  border-color: var(--color-primary);
  box-shadow: 0 12px 24px var(--color-shadow-md);
}

.color-btn:disabled {
  opacity: .35;
  filter: grayscale(1);
  cursor: not-allowed;
}

.color-preview {
  width: 40px;
  height: 40px;

  border-radius: var(--radius-full);
  border: 3px solid var(--color-surface);

  box-shadow:
    0 0 0 2px var(--color-border),
    0 4px 8px var(--color-shadow);
}

.cancel-btn {
  width: calc(100% - var(--space-2xl) * 2);
  margin: 0 var(--space-2xl) var(--space-2xl);

  height: var(--control-height-md);

  border: none;
  border-radius: var(--radius-md);

  background: var(--color-primary);
  color: var(--color-primary-text);

  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);

  cursor: pointer;
  transition: var(--transition-fast);
}

.cancel-btn:hover {
  background: var(--color-primary-hover);
}

@media (max-width: 640px) {
  .color-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
