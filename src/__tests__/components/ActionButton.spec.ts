import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";

import ActionButton from "../../components/game/actionsMenu/ActionButton.vue";

describe("ActionButton", () => {
  it("renders the label", () => {
    const wrapper = mount(ActionButton, {
      props: {
        label: "Roll Dice",
      },
    });

    expect(wrapper.text()).toContain("Roll Dice");
  });

  it("emits click", async () => {
    const wrapper = mount(ActionButton, {
      props: {
        label: "Roll Dice",
      },
    });

    await wrapper.trigger("click");

    expect(wrapper.emitted("click")).toHaveLength(1);
  });

  it("is disabled when disabled prop is true", () => {
    const wrapper = mount(ActionButton, {
      props: {
        label: "Roll Dice",
        disabled: true,
      },
    });

    expect(wrapper.attributes("disabled")).toBeDefined();
  });

  it("does not emit click when disabled", async () => {
    const wrapper = mount(ActionButton, {
      props: {
        label: "Roll Dice",
        disabled: true,
      },
    });

    await wrapper.trigger("click");

    expect(wrapper.emitted("click")).toBeUndefined();
  });

  it("adds exit class", () => {
    const wrapper = mount(ActionButton, {
      props: {
        label: "Exit",
        type: "exit",
      },
    });

    expect(wrapper.classes()).toContain("exit");
  });

  it("does not have exit class by default", () => {
    const wrapper = mount(ActionButton, {
      props: {
        label: "Roll Dice",
      },
    });

    expect(wrapper.classes()).not.toContain("exit");
  });

  it("updates the label when prop changes", async () => {
    const wrapper = mount(ActionButton, {
      props: {
        label: "Old",
      },
    });

    await wrapper.setProps({
      label: "New",
    });

    expect(wrapper.text()).toContain("New");
  });

  it("removes disabled attribute when updated", async () => {
    const wrapper = mount(ActionButton, {
      props: {
        label: "Roll Dice",
        disabled: true,
      },
    });

    await wrapper.setProps({
      disabled: false,
    });

    expect(wrapper.attributes("disabled")).toBeUndefined();
  });
});