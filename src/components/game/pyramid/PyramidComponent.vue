<script setup lang="ts">
</script>

<template>
  <div class="pyramid">
    <div class="sand"></div>
    <div class="entrance"></div>
    <div class="blocks"></div>
  </div>
</template>

<style scoped>
.pyramid {
  width: 90px;
  height: 70px;
  transform: translateX(-0%);
}

.sand {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);

  width: 0;
  height: 0;

  border-left: 45px solid transparent;
  border-right: 45px solid transparent;
  border-bottom: 65px solid #d8b15a;

  filter: drop-shadow(0 2px 2px rgba(0,0,0,.3));
}

.blocks {
  position: absolute;
  bottom: 18px;
  left: 50%;
  width: 55px;
  height: 25px;
  transform: translateX(-50%);

  background:
    linear-gradient(
      to bottom,
      transparent 45%,
      rgba(120,80,20,.25) 45%,
      rgba(120,80,20,.25) 55%,
      transparent 55%
    ),
    linear-gradient(
      to right,
      transparent 30%,
      rgba(120,80,20,.2) 30%,
      rgba(120,80,20,.2) 35%,
      transparent 35%,
      transparent 65%,
      rgba(120,80,20,.2) 65%,
      rgba(120,80,20,.2) 70%,
      transparent 70%
    );
}

.entrance {
  position: absolute;
  bottom: 5px;
  left: 50%;
  transform: translateX(-50%);

  width: 12px;
  height: 18px;

  background: #5b3a1b;
  border-radius: 8px 8px 0 0;
}
</style>