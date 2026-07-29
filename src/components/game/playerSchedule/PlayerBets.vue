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

  background: rgba(74, 53, 34, 0.45);
  backdrop-filter: blur(2px);
}

.dialog {
  width: min(420px, 100%);
  max-height: 80vh;

  display: flex;
  flex-direction: column;

  overflow: hidden;

  background: var(--color-surface-alt);

  border: 4px solid var(--color-primary);
  border-radius: var(--radius-xl);

  box-shadow: 0 18px 40px var(--color-shadow-md);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: var(--space-lg) var(--space-xl);

  background: var(--color-primary);
  color: var(--color-primary-text);
}

.header h2 {
  margin: 0;

  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  letter-spacing: 1px;
}

.close-btn {
  width: 38px;
  height: 38px;

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
  background: rgba(255, 255, 255, 0.18);
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

  background: linear-gradient(
    var(--color-surface),
    var(--color-background)
  );

  border: 2px solid var(--color-accent);
  border-radius: var(--radius-lg);

  box-shadow: 0 6px 14px var(--color-shadow-md);
}

.bet-card p {
  margin: 0;
  color: var(--color-text);
  font-weight: var(--font-weight-semibold);
}

.bet-card ul {
  margin: 0;
  padding-left: 1.25rem;
}

.bet-card li {
  margin-bottom: var(--space-xs);
  color: var(--color-text-muted);
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