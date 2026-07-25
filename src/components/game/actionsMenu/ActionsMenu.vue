<script setup lang="ts">
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import { useGame } from "@/composables/useGame";

import ActionsStack from "@/components/game/actionsMenu/ActionsStack.vue";
import ColorSelector from "@/components/game/actionsMenu/ColorSelector.vue";

const { t } = useI18n();

const { availableActions } = useGame();

const showWinnerBet = ref(false);
const showLoserBet = ref(false);

const actions = computed(() => [
  {
    key: "rollDice",
    label: t("actionsMenu.rollDice"),
    enabled: !!availableActions.value?.rollDice,
  },
  {
    key: "placeTile",
    label: t("actionsMenu.placeTile"),
    enabled: !!availableActions.value?.placeTile,
  },
  {
    key: "winnerBet",
    label: t("actionsMenu.winnerBet"),
    enabled: true,
  },
  {
    key: "loserBet",
    label: t("actionsMenu.loserBet"),
    enabled: true,
  },
  {
    key: "terminal",
    label: t("actionsMenu.terminal"),
    enabled: true,
  },
  {
    key: "exit",
    label: t("actionsMenu.exit"),
    enabled: true,
  },
]);

function actionSelected(key: string) {
  switch (key) {
    case "winnerBet":
      showWinnerBet.value = true;
      break;

    case "loserBet":
      showLoserBet.value = true;
      break;

    default:
      console.log(key);
  }
}
</script>

<template>
  <ActionsStack :actions="actions" @action="actionSelected" />

  <ColorSelector
    v-if="showWinnerBet"
    :colors="availableActions?.winnerBet"
    @select="showWinnerBet = false"
    @close="showWinnerBet = false"
  />

  <ColorSelector
    v-if="showLoserBet"
    :colors="availableActions?.loserBet"
    @select="showLoserBet = false"
    @close="showLoserBet = false"
  />
</template>
