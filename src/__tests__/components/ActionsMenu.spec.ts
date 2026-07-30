import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import { ref } from "vue";

import ActionsMenu from "../../components/game/actionsMenu/ActionsMenu.vue";

const availableActions = ref({
  rollDice: true,
  placeTile: [true, false, false],
  roundBet: {
    blue: true,
    green: false,
    red: true,
    yellow: false,
  },
  winnerBet: {
    blue: true,
    green: true,
    red: false,
    yellow: false,
  },
  loserBet: {
    blue: false,
    green: false,
    red: true,
    yellow: true,
  },
});

const rollTheDiceAction = vi.fn();
const placeWinnerBetAction = vi.fn();
const placeLoserBetAction = vi.fn();
const placeTileAction = vi.fn();
const takeRoundBetAction = vi.fn();

vi.mock("vue-i18n", () => ({
  useI18n: () => ({
    t: (k: string) => k,
  }),
}));

vi.mock("@/composables/useGame", () => ({
  useGame: () => ({
    availableActions,
  }),
}));

vi.mock("@/composables/useActions", () => ({
  useActions: () => ({
    rollTheDiceAction,
    placeWinnerBetAction,
    placeLoserBetAction,
    placeTileAction,
    takeRoundBetAction,
  }),
}));

vi.mock("@/components/game/actionsMenu/ActionsStack.vue", () => ({
  default: {
    props: ["actions"],
    emits: ["action"],
    template: "<div />",
  },
}));

vi.mock("@/components/game/actionsMenu/ColorSelector.vue", () => ({
  default: {
    props: ["colors"],
    emits: ["select", "close"],
    template: "<div class='color-selector' />",
  },
}));

vi.mock("@/components/game/actionsMenu/TileSelector.vue", () => ({
  default: {
    props: ["availableTiles"],
    emits: ["select", "close"],
    template: "<div class='tile-selector' />",
  },
}));

describe("ActionsMenu", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("calls rollTheDiceAction", async () => {
    const wrapper = mount(ActionsMenu);

    wrapper.findComponent({ name: "ActionsStack" }).vm.$emit("action", "rollDice");

    expect(rollTheDiceAction).toHaveBeenCalled();
  });

  it("opens round bet selector", async () => {
    const wrapper = mount(ActionsMenu);

    wrapper.findComponent({ name: "ActionsStack" }).vm.$emit("action", "roundBet");

    await wrapper.vm.$nextTick();

    expect(wrapper.find(".color-selector").exists()).toBe(true);
  });

  it("opens winner bet selector", async () => {
    const wrapper = mount(ActionsMenu);

    wrapper.findComponent({ name: "ActionsStack" }).vm.$emit("action", "winnerBet");

    await wrapper.vm.$nextTick();

    expect(wrapper.find(".color-selector").exists()).toBe(true);
  });

  it("opens loser bet selector", async () => {
    const wrapper = mount(ActionsMenu);

    wrapper.findComponent({ name: "ActionsStack" }).vm.$emit("action", "loserBet");

    await wrapper.vm.$nextTick();

    expect(wrapper.find(".color-selector").exists()).toBe(true);
  });

  it("opens tile selector", async () => {
    const wrapper = mount(ActionsMenu);

    wrapper.findComponent({ name: "ActionsStack" }).vm.$emit("action", "placeTile");

    await wrapper.vm.$nextTick();

    expect(wrapper.find(".tile-selector").exists()).toBe(true);
  });

  it("places a tile", async () => {
    const wrapper = mount(ActionsMenu);

    wrapper.findComponent({ name: "ActionsStack" }).vm.$emit("action", "placeTile");

    await wrapper.vm.$nextTick();

    wrapper.findComponent({ name: "TileSelector" }).vm.$emit("select", {
      position: 4,
      tileType: "2",
    });

    expect(placeTileAction).toHaveBeenCalledWith(4, 2);
  });

  it("takes a round bet", async () => {
    const wrapper = mount(ActionsMenu);

    wrapper.findComponent({ name: "ActionsStack" }).vm.$emit("action", "roundBet");

    await wrapper.vm.$nextTick();

    wrapper.findComponent({ name: "ColorSelector" }).vm.$emit("select", "red");

    expect(takeRoundBetAction).toHaveBeenCalledWith("red");
  });

  it("places winner bet", async () => {
    const wrapper = mount(ActionsMenu);

    wrapper.findComponent({ name: "ActionsStack" }).vm.$emit("action", "winnerBet");

    await wrapper.vm.$nextTick();

    wrapper.findComponent({ name: "ColorSelector" }).vm.$emit("select", "blue");

    expect(placeWinnerBetAction).toHaveBeenCalledWith("blue");
  });

  it("places loser bet", async () => {
    const wrapper = mount(ActionsMenu);

    wrapper.findComponent({ name: "ActionsStack" }).vm.$emit("action", "loserBet");

    await wrapper.vm.$nextTick();

    wrapper.findComponent({ name: "ColorSelector" }).vm.$emit("select", "yellow");

    expect(placeLoserBetAction).toHaveBeenCalledWith("yellow");
  });

  it("closes color selector", async () => {
    const wrapper = mount(ActionsMenu);

    wrapper.findComponent({ name: "ActionsStack" }).vm.$emit("action", "roundBet");

    await wrapper.vm.$nextTick();

    expect(wrapper.find(".color-selector").exists()).toBe(true);

    wrapper.findComponent({ name: "ColorSelector" }).vm.$emit("close");

    await wrapper.vm.$nextTick();

    expect(wrapper.find(".color-selector").exists()).toBe(false);
  });

  it("handles object available colors", () => {
    availableActions.value.winnerBet = {
      blue: { available: true },
      green: { available: false },
      red: { available: false },
      yellow: { available: false },
    } as any;

    const wrapper = mount(ActionsMenu);

    const actions = wrapper.findComponent({ name: "ActionsStack" }).props("actions");

    expect(actions.find((a: any) => a.key === "winnerBet").enabled).toBe(true);
  });

  it("handles unknown action", () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});

    const wrapper = mount(ActionsMenu);

    wrapper.findComponent({ name: "ActionsStack" }).vm.$emit("action", "unknown");

    expect(spy).toHaveBeenCalledWith("unknown");

    spy.mockRestore();
  });
});