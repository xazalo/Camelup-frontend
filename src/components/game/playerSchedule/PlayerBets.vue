<script setup lang="ts">
import type { Player } from "@/types/game/players/Player";

defineProps<{
  player: Player;
}>();

const emit = defineEmits<{
  close: [];
}>();

function close() {
  emit("close");
}
</script>

<template>
  <div
    class="overlay"
    @click="close"
  >
    <div
      class="dialog"
      @click.stop
    >
      <div class="header">
        <h2>
          {{ $t("playerBets.title", { player: player.name }) }}
        </h2>

        <button
          class="close-btn"
          :aria-label="$t('playerBets.close')"
          @click="close"
        >
          ✕
        </button>
      </div>

      <div
        v-if="player.cards.length > 0"
        class="cards"
      >
        <div
          v-for="(card, index) in player.cards"
          :key="index"
          class="bet-card"
        >
          <p>
            <strong>{{ $t("playerBets.camel") }}:</strong>
            {{ card.camel.color }}
          </p>

          <p>
            <strong>{{ $t("playerBets.payouts") }}</strong>
          </p>

          <ul>
            <li
              v-for="(value, position) in card.payouts"
              :key="position"
            >
              {{ $t("playerBets.position") }} {{ position }}:
              {{ value }}
            </li>
          </ul>
        </div>
      </div>

      <p
        v-else
        class="empty"
      >
        {{ $t("playerBets.noCards") }}
      </p>
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

  background: rgb(0 0 0 / 0.45);
  backdrop-filter: blur(2px);
}

.dialog {
  width: min(420px, 100%);
  max-height: 80vh;

  display: flex;
  flex-direction: column;

  overflow: hidden;

  background: var(--color-surface);

  border: var(--border-width) solid var(--color-border);
  border-radius: var(--radius-xl);

  box-shadow: var(--shadow-lg);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: var(--space-lg) var(--space-xl);

  background: var(--color-primary);
  color: var(--color-primary-text);

  border-bottom: var(--border-width) solid var(--color-border);
}

.header h2 {
  margin: 0;
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
}

.close-btn {
  width: 36px;
  height: 36px;

  display: flex;
  justify-content: center;
  align-items: center;

  border: none;
  border-radius: 50%;

  background: transparent;
  color: inherit;

  font-size: 1.4rem;
  cursor: pointer;

  transition: var(--transition-fast);
}

.close-btn:hover {
  background: rgb(255 255 255 / 0.15);
}

.cards {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);

  padding: var(--space-xl);

  overflow-y: auto;
}

.bet-card {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);

  padding: var(--space-lg);

  background: var(--color-background);

  border: var(--border-width) solid var(--color-border);
  border-radius: var(--radius-lg);

  box-shadow: var(--shadow-sm);
}

.bet-card p {
  margin: 0;
}

.bet-card ul {
  margin: 0;
  padding-left: 1.25rem;
}

.bet-card li {
  margin-bottom: var(--space-xs);
}

.empty {
  padding: var(--space-2xl);

  text-align: center;
  color: var(--color-text-muted);

  font-style: italic;
}

@media (max-width: 640px) {
  .dialog {
    width: 100%;
    max-height: 90vh;
  }

  .header {
    padding: var(--space-md) var(--space-lg);
  }

  .cards {
    padding: var(--space-lg);
  }
}
</style>