<script setup lang="ts">
import { ref, computed } from "vue";

const props = defineProps<{
  availableTiles: boolean[];
}>();

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

const tileTypes = [
  {
    label: "oasis",
    value: "1",
  },
  {
    label: "mirage",
    value: "2",
  },
];

const availablePositions = computed(() =>
  props.availableTiles
    .map((available, index) => (available ? index : null))
    .filter((index): index is number => index !== null),
);

function confirm() {
  if (position.value === null || !tileType.value) {
    return;
  }

  if (!props.availableTiles[position.value]) {
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
      <h2>{{ $t("tileSelector.title") }}</h2>

      <div class="content">
        <input v-model.number="position" type="number" :placeholder="$t('tileSelector.position')" />

        <select v-model="tileType">
          <option disabled value="">
            {{ $t("tileSelector.type") }}
          </option>

          <option v-for="type in tileTypes" :key="type.value" :value="type.value">
            {{ type.label }}
          </option>
        </select>

        <div class="actions">
          <button class="confirm-btn" @click="confirm">
            {{ $t("tileSelector.confirm") }}
          </button>

          <button class="cancel-btn" @click="$emit('close')">
            {{ $t("tileSelector.cancel") }}
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
  backdrop-filter: blur(2px);
}

.dialog {
  width: min(420px, 100%);

  background: var(--color-surface-alt);
  border: 4px solid var(--color-accent);
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

  border: 2px solid var(--color-border);
  border-radius: var(--radius-md);

  background: linear-gradient(
    var(--color-surface),
    var(--color-background)
  );

  color: var(--color-text);

  font-size: var(--font-size-md);

  transition: var(--transition-fast);
}

input:focus,
select:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(201, 123, 42, 0.2);
}

.actions {
  display: flex;
  gap: var(--space-md);
}

.actions button {
  flex: 1;
  height: var(--control-height-md);

  border: none;
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
  background: var(--color-primary-hover);
}

.cancel-btn {
  background: var(--color-surface);
  color: var(--color-text-muted);
  border: 2px solid var(--color-border);
}

.cancel-btn:hover {
  background: var(--color-background);
  border-color: var(--color-primary);
  color: var(--color-primary);
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
