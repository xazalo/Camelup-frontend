<script setup lang="ts">
import { ref } from "vue";

const emit = defineEmits<{
  select: [
    data: {
      position: number;
      tileType: string;
    },
  ];

  close: [];
}>();

const position = ref<number | null>(null);
const tileType = ref<string>("");

const tileTypes = ["oasis", "trap"];

function confirm() {
  if (position.value === null || !tileType.value) {
    return;
  }

  emit("select", {
    position: position.value,
    tileType: tileType.value,
  });
}
</script>

<template>
  <div class="overlay">
    <div class="dialog">
      <h2>Select tile</h2>

      <div class="content">
        <input
          v-model.number="position"
          type="number"
          placeholder="Position"
        />

        <select v-model="tileType">
          <option disabled value="">
            Select type
          </option>

          <option
            v-for="type in tileTypes"
            :key="type"
            :value="type"
          >
            {{ type }}
          </option>
        </select>

        <div class="actions">
          <button
            class="confirm-btn"
            @click="confirm"
          >
            Confirm
          </button>

          <button
            class="cancel-btn"
            @click="$emit('close')"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  z-index: 200;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: var(--space-xl);

  background: rgba(74, 53, 34, 0.45);
}

.dialog {
  width: min(380px, 100%);
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

.content {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
  padding: var(--space-2xl);
}

input,
select {
  width: 100%;
  height: var(--control-height-md);

  padding: 0 var(--space-md);

  border: var(--border-width) solid var(--color-border);
  border-radius: var(--radius-md);

  background: var(--color-background);
  color: var(--color-text);

  font-size: var(--font-size-md);
}

.actions {
  display: flex;
  gap: var(--space-md);
}

.actions button {
  flex: 1;
  height: var(--control-height-md);

  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);

  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);

  cursor: pointer;
  transition: var(--transition-fast);
}

.confirm-btn {
  background: var(--color-primary);
  color: var(--color-primary-text);
}

.confirm-btn:hover {
  filter: brightness(1.05);
}

.cancel-btn {
  background: var(--color-surface-alt);
  color: var(--color-text-muted);
}

.cancel-btn:hover {
  background: var(--color-border);
}

@media (max-width: 640px) {
  .dialog {
    width: 100%;
  }

  .actions {
    flex-direction: column;
  }
}
</style>
