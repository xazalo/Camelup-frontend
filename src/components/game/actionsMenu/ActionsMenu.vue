<script setup lang="ts">
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import { useGame } from "@/composables/useGame";
import { useActions } from "@/composables/useActions";

import ActionsStack from "@/components/game/actionsMenu/ActionsStack.vue";
import ColorSelector from "@/components/game/actionsMenu/ColorSelector.vue";
import TileSelector from "@/components/game/actionsMenu/TileSelector.vue";

const { t } = useI18n();

const { availableActions } = useGame();

const { rollTheDiceAction, placeWinnerBetAction, placeLoserBetAction, placeTileAction } =
  useActions();

const selectedColorAction = ref<"winnerBet" | "loserBet" | null>(null);
const showTileSelector = ref(false);

function hasAvailableColors(colors?: Record<string, boolean>) {
  return !!colors && Object.values(colors).some(Boolean);
}

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
    enabled: hasAvailableColors(availableActions.value?.winnerBet),
  },
  {
    key: "loserBet",
    label: t("actionsMenu.loserBet"),
    enabled: hasAvailableColors(availableActions.value?.loserBet),
  },
  {
    key: "exit",
    label: t("actionsMenu.exit"),
    enabled: true,
  },
]);

function actionSelected(key: string) {
  switch (key) {
    case "rollDice":
      rollTheDiceAction();
      break;

    case "winnerBet":
      selectedColorAction.value = "winnerBet";
      break;

    case "loserBet":
      selectedColorAction.value = "loserBet";
      break;

    case "placeTile":
      showTileSelector.value = true;
      break;

    default:
      console.log(key);
  }
}

function tileSelected(data: { position: number; tileType: string }) {
  placeTileAction(data.position, data.tileType);

  showTileSelector.value = false;
}

function colorSelected(color: string) {
  if (selectedColorAction.value === "winnerBet") {
    placeWinnerBetAction(color);
  }

  if (selectedColorAction.value === "loserBet") {
    placeLoserBetAction(color);
  }

  selectedColorAction.value = null;
}

function closeSelector() {
  selectedColorAction.value = null;
}
</script>

<template>
  <ActionsStack :actions="actions" @action="actionSelected" />

  <ColorSelector
    v-if="selectedColorAction === 'winnerBet'"
    :colors="availableActions?.winnerBet"
    @select="colorSelected"
    @close="closeSelector"
  />

  <ColorSelector
    v-if="selectedColorAction === 'loserBet'"
    :colors="availableActions?.loserBet"
    @select="colorSelected"
    @close="closeSelector"
  />

  <TileSelector v-if="showTileSelector" @select="tileSelected" @close="showTileSelector = false" />
</template>
