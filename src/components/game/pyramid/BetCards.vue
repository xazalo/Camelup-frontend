<script setup lang="ts">
import { useGame } from "@/composables/useGame";

const { availableBetCards } = useGame();

const emit = defineEmits<{
  close: [];
}>();

const colorMap: Record<string, string> = {
  yellow: "#f5c542",
  green: "#46b96b",
  blue: "#4d8cf5",
  red: "#df4d4d",
};


</script>

<template>
  <div class="overlay" @click.self="emit('close')">
    <div class="dialog">
      <h2>{{ $t("betCards.title") }}</h2>

      <div class="cards">
        <div
          v-for="(card, color) in availableBetCards"
          :key="color"
          class="card"
          :class="{ disabled: !card }"
        >
          <div class="card-header" :style="{ backgroundColor: colorMap[color] }">
            {{ color === "red" ? $t("colors.red") : "" }}
            {{ color === "yellow" ? $t("colors.yellow") : "" }}
            {{ color === "blue" ? $t("colors.blue") : "" }}
            {{ color === "green" ? $t("colors.green") : "" }}
          </div>

          <div class="camel">
            <Icon icon="game-icons:camel-head" width="64" :color="colorMap[color]" />
          </div>

          <template v-if="card">
            <div class="reward">
              <div class="reward-label">
                <Icon icon="mdi:trophy" width="18" />
                <span>1º</span>
              </div>

              <span class="reward-value">{{ card[1] }}</span>
            </div>

            <div class="reward">
              <div class="reward-label">
                <Icon icon="mdi:medal" width="18" />
                <span>2º</span>
              </div>

              <span class="reward-value">{{ card[2] }}</span>
            </div>

            <div class="reward">
              <div class="reward-label">
                <span>3º</span>
              </div>

              <span class="reward-value">{{ card[3] }}</span>
            </div>

            <div class="reward">
              <div class="reward-label">
                <span>4º</span>
              </div>

              <span class="reward-value">{{ card[4] }}</span>
            </div>
          </template>

          <div v-else class="empty">{{ $t("betCards.noCards") }}</div>
        </div>
      </div>

      <div class="actions">
        <button class="cancel-btn" @click="emit('close')">{{ $t("betCards.close") }}</button>
      </div>
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
  backdrop-filter: blur(2px);

  z-index: 200;
}

.dialog {
  width: min(950px, 95vw);

  background: var(--color-surface-alt);
  border: 4px solid var(--color-primary);
  border-radius: var(--radius-xl);

  overflow: hidden;
  box-shadow: 0 18px 40px var(--color-shadow-md);
}

.dialog h2 {
  margin: 0;
  padding: 18px;

  background: var(--color-primary);
  color: var(--color-primary-text);

  text-align: center;
  letter-spacing: 1px;
}

.cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);

  gap: 24px;
  padding: 28px;
}

.card {
  display: flex;
  flex-direction: column;
  align-items: center;

  overflow: hidden;

  background: linear-gradient(
    var(--color-surface),
    var(--color-background)
  );

  border: 3px solid var(--color-accent);
  border-radius: var(--radius-lg);

  box-shadow: 0 6px 14px var(--color-shadow-md);

  transition: 0.2s;
  cursor: pointer;
}

.card:hover:not(.disabled) {
  transform: translateY(-8px) rotate(-2deg);
  box-shadow: 0 12px 24px var(--color-shadow-md);
}

.card-header {
  width: 100%;
  padding: 10px;

  text-align: center;
  font-weight: var(--font-weight-bold);
  color: var(--color-primary-text);
  letter-spacing: 1px;
}

.camel {
  padding: 18px 0 10px;
}

.reward {
  width: 80%;

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 8px 0;

  border-bottom: 1px solid var(--color-border);
}

.reward:last-child {
  border-bottom: none;
}

.reward-label {
  display: flex;
  align-items: center;
  gap: 6px;

  font-weight: var(--font-weight-semibold);
  color: var(--color-text-muted);
}

.reward-value {
  font-size: 1.1rem;
  font-weight: var(--font-weight-bold);
  color: var(--color-text);
}

.empty {
  padding: 40px 0;
  color: var(--color-text-muted);
}

.disabled {
  opacity: 0.35;
  filter: grayscale(1);
  cursor: not-allowed;
}

.actions {
  display: flex;
  justify-content: flex-end;

  padding: 18px 24px;

  border-top: 2px solid var(--color-border);
}

.cancel-btn {
  padding: 10px 18px;

  border: none;
  border-radius: var(--radius-md);

  background: var(--color-primary);
  color: var(--color-primary-text);

  font-weight: var(--font-weight-semibold);

  cursor: pointer;
  transition: var(--transition-fast);
}

.cancel-btn:hover {
  background: var(--color-primary-hover);
}
</style>
