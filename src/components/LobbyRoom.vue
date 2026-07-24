<script setup lang="ts">
import { storeToRefs } from "pinia";
import { Icon } from "@iconify/vue";

import { useLobbyStore } from "@/stores/lobby";
import { useLobby } from "@/composables/useLobby";
import { useGame } from "@/composables/useGame";

const lobbyStore = useLobbyStore();

const { lobby } = storeToRefs(lobbyStore);

const { addOneAI } = useLobby();
const { start } = useGame();

const copyLobbyCode = async () => {
  if (!lobby.value) return;
  await navigator.clipboard.writeText(lobby.value.id);
  alert("The code has been copied");
};

const handleAddAI = () => {
  if (!lobby.value) return;
  addOneAI(lobby.value.id);
};

const handleStartGame = () => {
  if (!lobby.value) return;
  start();
};
</script>

<template>
  <section v-if="lobby">
    <header>
      <h2>{{ $t("lobby.title") }}</h2>

      <div class="lobby-code">
        <span>{{ $t("lobby.code") }}</span>

        <strong>{{ lobby.id }}</strong>

        <button type="button" @click="copyLobbyCode">
          <Icon icon="lucide:copy" />
          {{ $t("lobby.copy") }}
        </button>
      </div>
    </header>

    <div>
      <h2>{{ $t("lobby.players") }}</h2>

      <ul class="players-list">
        <li v-for="player in lobby.players" :key="player.name" class="player-item">
          <div class="player-info">
            <div class="player-avatar">
              <Icon :icon="player.isAI ? 'lucide:bot' : 'lucide:user-round'" />
            </div>

            <span class="player-name">
              {{ player.name }}
            </span>
          </div>

          <span class="player-badge" :class="{ ai: player.isAI }">
            <Icon :icon="player.isAI ? 'lucide:cpu' : 'lucide:crown'" />
          </span>
        </li>
      </ul>
    </div>

    <footer>
      <button type="button" class="btn" @click="handleAddAI">
        <Icon icon="lucide:bot" />
        {{ $t("lobby.addAI") }}
      </button>

      <button type="button" class="btn" @click="handleStartGame">
        <Icon icon="lucide:play" />
        {{ $t("lobby.startGame") }}
      </button>
    </footer>
  </section>

  <section v-else>
    <p>{{ $t("lobby.noLobby") }}</p>
  </section>
</template>

<style scoped>
section {
  max-width: var(--container-sm);
  margin: 0 auto;
  padding: var(--space-3xl);
}

header {
  display: flex;
  flex-direction: column;
  gap: var(--space-2xl);
  margin-bottom: var(--space-3xl);
}

header h2 {
  margin: 0;
  font-size: var(--font-size-3xl);
  color: var(--color-primary);
}

.lobby-code {
  display: flex;
  align-items: center;
  gap: var(--space-lg);
  padding: var(--space-xl) var(--space-2xl);
  border: var(--border-width) solid var(--color-border);
  border-radius: var(--radius-xl);
  background: var(--color-surface-alt);
}

.lobby-code strong {
  font-size: var(--font-size-lg);
  letter-spacing: 0.08em;
}

.lobby-code button {
  margin-left: auto;
}

main h2 {
  margin-bottom: var(--space-xl);
}

.players-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

.player-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-lg) var(--space-xl);
  background: var(--color-surface);
  border: var(--border-width) solid var(--color-border);
  border-radius: var(--radius-lg);
  transition:
    border-color var(--transition-fast),
    transform var(--transition-fast);
}

.player-item:hover {
  border-color: var(--color-primary);
  transform: translateY(-1px);
}

.player-info {
  display: flex;
  align-items: center;
  gap: var(--space-lg);
}

.player-avatar {
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-full);
  background: var(--color-surface-alt);
  color: var(--color-primary);
  font-size: var(--font-size-xl);
}

.player-name {
  font-weight: var(--font-weight-semibold);
}

.player-badge {
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-full);
  background: rgba(var(--color-primary-rgb), 0.12);
  color: var(--color-primary);
}

.player-badge.ai {
  background: rgba(99, 102, 241, 0.15);
  color: #6366f1;
}

footer {
  display: flex;
  justify-content: flex-end;
  gap: var(--space-xl);
  margin-top: var(--space-3xl);
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-md);
  height: 44px;
  padding: 0 var(--space-2xl);
  border-radius: var(--radius-lg);
  border: var(--border-width) solid transparent;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  cursor: pointer;
  transition: transform var(--transition-fast);
}

.btn:hover {
  transform: translateY(-1px);
}

.btn:active {
  transform: translateY(0);
}

.btn svg {
  width: 18px;
  height: 18px;
}

@media (max-width: 768px) {
  section {
    padding: var(--space-2xl);
  }

  header h2 {
    font-size: var(--font-size-2xl);
  }

  footer {
    flex-direction: column;
  }

  .btn {
    width: 100%;
  }
}

@media (max-width: 480px) {
  section {
    padding: var(--space-xl);
  }

  .lobby-code {
    flex-wrap: wrap;
    padding: var(--space-lg);
  }

  .lobby-code button {
    width: 100%;
    margin-left: 0;
  }

  .player-item {
    padding: var(--space-md) var(--space-lg);
  }

  .player-avatar {
    width: 36px;
    height: 36px;
  }

  .player-info {
    gap: var(--space-md);
  }

  .player-name {
    max-width: 140px;
  }
}
</style>
