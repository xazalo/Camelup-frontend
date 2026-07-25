<script setup lang="ts">
import { Icon } from "@iconify/vue";
import type { Player } from "@/types/game/players/Player";

defineProps<{
  players: Player[];
}>();
</script>

<template>
  <div class="player-schedule">
    <div
      v-for="player in players"
      :key="player.name"
      class="player"
    >
      <div class="player-info">
        <div class="avatar">
          <Icon :icon="player.isAI ? 'lucide:bot' : 'lucide:user'" />
        </div>

        <span class="name">
          {{ player.name }}
        </span>
      </div>

      <span class="money">
        {{ player.money }} 💰
      </span>
    </div>
  </div>
</template>

<style scoped>
.player-schedule {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  min-width: 240px;
}

.player {
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: var(--space-sm) var(--space-md);

  background: var(--color-surface);
  border: 1px solid rgb(0 0 0 / .15);
  border-radius: var(--radius-md);

  box-shadow: var(--shadow-sm);
}

.player-info {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.avatar {
  width: 36px;
  height: 36px;

  display: flex;
  justify-content: center;
  align-items: center;

  background: white;
  color: black;

  border: 2px solid black;
  border-radius: 50%;
}

.avatar svg {
  font-size: var(--font-size-lg);
}

.name {
  font-weight: 700;
  font-size: var(--font-size-md);
}

.money {
  display: flex;
  align-items: center;
  gap: var(--space-xs);

  font-weight: 700;
  font-size: var(--font-size-md);
}
</style>