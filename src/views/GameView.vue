<script setup lang="ts">
import BoardComponent from "@/components/game/board/BoardComponent.vue";
import RollComponent from "@/components/game/pyramid/RollComponent.vue";
import PlayerSchedule from "@/components/game/playerSchedule/PlayerSchedule.vue";
import ActionsMenu from "@/components/game/actionsMenu/ActionsMenu.vue";
</script>

<template>
  <div class="game-view">
    <section class="board-container">
      <BoardComponent />
    </section>

    <section class="sidebar">
      <RollComponent />
      <PlayerSchedule />
      <!--Terminal-->
    </section>

    <section class="actions">
      <ActionsMenu />
    </section>
  </div>
</template>

<style scoped>
.game-view {
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(280px, 1fr);
  grid-template-rows: 1fr auto;
  max-height: 100vh;
}

.board-container {
  max-height: 85vh;
  grid-column: 1;
  grid-row: 1;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 1rem;
}

.sidebar {
  max-height: 85vh;
  grid-column: 2;
  grid-row: 1;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 1rem;
  gap: var(--space-md);
}

.actions {
  grid-column: 1 / -1;
  grid-row: 2;

  height: 12vh;
  width: auto;
  display: flex;
  justify-content: center;
}
</style>
