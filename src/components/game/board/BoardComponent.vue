<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import SpaceComponent from "@/components/game/board/SpaceComponent.vue";
import { useGame } from "@/composables/useGame";
import { Icon } from "@iconify/vue";

const { board } = useGame();

// Board size
const boardWidth = 700;
const boardHeight = 450;

const tileOffsetX = -40;
const tileOffsetY = -30;

const radiusX = 300;
const radiusY = 180;

const spaceSize = 0;

// Board scale
const wrapper = ref<HTMLElement | null>(null);

const wrapperWidth = ref(boardWidth);
const viewportHeight = ref(window.innerHeight);

const updateViewportHeight = () => {
  viewportHeight.value = window.innerHeight;
};

const scale = computed(() =>
  Math.min(wrapperWidth.value / boardWidth, viewportHeight.value / boardHeight * 0.75, 1),
);

let resizeObserver: ResizeObserver | null = null;

onMounted(() => {
  if (!wrapper.value) return;

  resizeObserver = new ResizeObserver(([entry]) => {
    wrapperWidth.value = entry!.contentRect.width;
  });

  resizeObserver.observe(wrapper.value);

  window.addEventListener("resize", updateViewportHeight);
});

onUnmounted(() => {
  resizeObserver?.disconnect();
  window.removeEventListener("resize", updateViewportHeight);
});

// Spaces
const positions = computed(() => {
  if (!board.value) return [];

  return board.value.spaces.map((_, index) => {
    const angle = (index / board.value!.spaces.length) * Math.PI * 2 - Math.PI / 2;

    return {
      left: boardWidth / 2 + Math.cos(angle) * radiusX + tileOffsetX - spaceSize / 2,
      top: boardHeight / 2 + Math.sin(angle) * radiusY + tileOffsetY - spaceSize / 2,
    };
  });
});
</script>

<template>
  <div ref="wrapper" class="board-wrapper">
    <div class="board-scale" :style="{ transform: `scale(${scale})` }">
      <div
        v-if="board"
        class="board"
        :style="{
          width: boardWidth + 'px',
          height: boardHeight + 'px',
        }"
      >
        <div class="desert">
          <Icon icon="lucide:tree-palm" class="palm palm-1" />
          <Icon icon="lucide:tree-palm" class="palm palm-2" />
          <Icon icon="lucide:tree-palm" class="palm palm-3" />
        </div>

        <div class="track"></div>

        <SpaceComponent
          v-for="(space, index) in board.spaces"
          :key="index"
          :space="space"
          :index="index"
          :style="{
            left: positions[index]!.left + 'px',
            top: positions[index]!.top + 'px',
          }"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.board-wrapper {
  margin-top: 10px;
  width: 95%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  overflow: hidden;
}

.board-scale {
  transform-origin: top center;
  transition: transform 0.2s ease;
}

.board {
  position: relative;

  width: 700px;
  height: 450px;

  display: flex;
  justify-content: center;
  align-items: center;

  background: radial-gradient(circle, var(--color-parchment-light) 0%, var(--color-background) 75%);

  border: 4px solid var(--color-gold);
  border-radius: 32px;

  box-shadow:
    inset 0 0 40px rgba(0, 0, 0, 0.08),
    0 12px 28px var(--color-shadow-md);

  overflow: hidden;
  box-sizing: border-box;
}

.desert {
  position: absolute;

  width: 340px;
  height: 220px;

  border-radius: 50%;

  background: radial-gradient(circle at 35% 35%, #f7e7b4 0%, #e7c97d 100%);

  box-shadow: inset 0 0 30px rgba(0, 0, 0, 0.08);
}

.track {
  position: absolute;

  width: 640px;
  height: 390px;

  border: 42px solid #d4b06a;
  border-radius: 50%;

  box-sizing: border-box;
  opacity: 0.65;
}

.track::after {
  content: "";
  position: absolute;
  inset: -18px;

  border: 2px dashed rgba(90, 60, 25, 0.25);
  border-radius: 50%;
}

.palm {
  position: absolute;

  width: 45px;
  height: 45px;

  color: var(--color-secondary-hover);
  stroke-width: 1.7;

  filter: drop-shadow(0 3px 2px rgba(0, 0, 0, 0.18));
}

.palm-1 {
  left: 55px;
  top: 35px;
  transform: rotate(-18deg);
}

.palm-2 {
  right: 45px;
  bottom: 35px;

  width: 60px;
  height: 60px;

  transform: rotate(15deg) scaleX(-1);
}

.palm-3 {
  left: 145px;
  bottom: 55px;

  width: 30px;
  height: 30px;

  opacity: 0.65;

  transform: rotate(-8deg);
}
</style>
